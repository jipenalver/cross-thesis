import { objectValueTrim } from '@/utils/helpers/others'
import { supabase } from '@/utils/supabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface StudentPost {
  created_at?: string
  message?: string
  post_id?: string
  email?: string
}

export const useStudentsStore = defineStore('student', () => {
  // States
  const postsData = ref<StudentPost[]>([])
  const filteredData = ref<Partial<StudentPost[]>>([])

  // Retrieve Student Posts
  async function getStudentsPosts(email: string) {
    const { data } = (await supabase
      .from('fetches')
      .select('*')
      .neq('message', '')
      .eq('email', email)
      .eq('is_suicidal', false)
      .eq('is_checked', false)) as {
      data: StudentPost[]
    }

    postsData.value = data
  }

  // Push to Anthropic AI
  async function pushToGroq(email: string) {
    const postsList = postsData.value
      .map(
        ({ post_id, message, created_at }) =>
          `${post_id}||${objectValueTrim(message ?? '')}||${created_at}`,
      )
      .join('; ')

    if (postsList.length === 0) return

    const message =
      'Text Classification Task: Analyze the provided list of sentences formatted as ID||MESSAGE||CREATED_AT and separated by semicolons (;).' +
      'Identify and count the sentences that reflect personal suicidal thoughts or ideations specifically about oneself. ' +
      'In addition to the count, return these sentences in this format ID||MESSAGE||CREATED_AT, still separated by semicolons. ' +
      'Please reply in json format, totalCount, with suicidal. \n\n' +
      postsList

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        model: 'llama3-8b-8192',
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        response_format: {
          type: 'json_object',
        },
        stop: null,
        seed: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
      },
    )

    const result = JSON.parse(objectValueTrim(response.data.choices[0].message.content))

    const { data } = await updateStudentPosts(email, result.suicidal)

    if (data) filteredData.value = data
  }

  // Update Student Posts
  async function updateStudentPosts(email: string, suicidal: string[]) {
    await supabase.from('student_posts').delete().eq('email', email)

    const suicidalPosts = suicidal.map((item: string) => {
      const [post_id, , created_at] = item.split('||')
      return { post_id, created_at, email }
    })

    await supabase.from('student_posts').insert(suicidalPosts).select()

    const suicidalIds = suicidalPosts.map((item) => item.post_id)

    await supabase.from('fetches').update({ is_checked: true }).eq('email', email).select()

    return await supabase
      .from('fetches')
      .update({ is_suicidal: true })
      .in('post_id', suicidalIds)
      .select()
  }

  return { postsData, getStudentsPosts, pushToGroq }
})
