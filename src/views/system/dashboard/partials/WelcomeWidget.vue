<script setup lang="ts">
import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const authStore = useAuthUserStore()
</script>

<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="3" :class="mobile ? 'd-flex align-center' : ''">
          <v-img
            class="mx-auto"
            :width="mobile ? undefined : '25%'"
            src="/logo-csu.png"
            :height="mobile ? '200px' : undefined"
          ></v-img>
        </v-col>

        <v-col cols="12" sm="9">
          <h2 class="mb-5">
            Welcome Aboard,
            <span class="font-weight-black">
              {{ authStore.userData?.firstname + ' ' + authStore.userData?.lastname }}!
            </span>
          </h2>

          <p class="text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe ipsum, repellat aliquid
            reprehenderit dolor exercitationem, voluptas est numquam error nostrum at id quidem
            velit soluta repudiandae, esse dolorem fugiat earum? Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Dolores dolore doloribus sed quos porro ad molestiae
            tempora nisi fugit cumque, maiores veritatis, expedita earum quis ipsa. Molestias
            eligendi quisquam sit? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Delectus, in aperiam dolor doloremque amet libero, eum ducimus vel illo aliquid omnis
            nihil sit. Accusantium natus aliquam quaerat earum, id voluptatem. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Sed ullam autem nulla fuga, quod harum maiores
            voluptatum quasi totam, atque dolor impedit officia delectus. Dolore dolorum molestias
            ipsa reiciendis quidem!
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
