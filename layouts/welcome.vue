<template>
  <v-app>
    <wel-app-bar
      :menus="menus"
      :img-height="imgHeight"
    />
    <v-img
      id="scroll-top"
      dark
      src="https://picsum.photos/id/20/1920/1080?blur=5"
      gradient="to top right, rgba(19,84,122,.6), rgba(128,208,199,.9)"
      :height="imgHeight"
    >
      <v-row
        align="center"
        justify="center"
        :style="{ height: `${imgHeight}px` }"
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <h1 class="display-1 mb-4">
            未来を作ろう。ワクワクしよう。
          </h1>
          <h4
            class="subheading"
            :style="{ letterSpacing: '5px' }"
          >
            中小企業に特化した事業計画策定ツール
          </h4>
        </v-col>
      </v-row>
    </v-img>
    <v-sheet>
      <v-container
        fluid
        :style="{maxWidth: '1280px'}"
      >
        <v-row
          v-for="(menu, i) in menus"
          :key="`menu-${i}`"
        >
          <v-col
            :id="menu.title"
            cols="12"
          >
            <v-card flat>
              <v-card-title class="justify-center display-1">
                {{ $t(`menus.${menu.title}`) }}
              </v-card-title>
              <v-card-text class="text-center">
                {{ menu.subtitle }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div :is="`wel-${menu.title}`" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <bef-login-footer />
  </v-app>
</template>

<script>
import welAppBar from '~/components/welcome/welAppBar.vue'
import welAbout from '~/components/welcome/welAbout.vue'
import welProducts from '~/components/welcome/welProducts.vue'
import welPrice from '~/components/welcome/welPrice.vue'
import welContact from '~/components/welcome/welContact.vue'
import welCompany from '~/components/welcome/welCompany.vue'
import BefLoginFooter from '~/components/beforeLogin/befLoginFooter.vue'

export default {
  components: {
    welAppBar,
    welAbout,
    welProducts,
    welPrice,
    welContact,
    welCompany,
    BefLoginFooter
  },
  data () {
    return {
      imgHeight: 500,
      menus: [
        { title: 'about', subtitle: 'このサイトはブログ"独学プログラマ"で公開されているチュートリアルのデモアプリケーションです' },
        { title: 'products', subtitle: '他にはない優れた機能の数々' },
        { title: 'price', subtitle: '会社の成長に合わせた3つのプラン' },
        { title: 'contact', subtitle: 'お気軽にご連絡を' },
        { title: 'company', subtitle: '私たちの会社' }
      ]
    }
  }
}

</script>
