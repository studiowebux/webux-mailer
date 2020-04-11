<template>
  <div id="emails" class="container">
    <div class="text-center mx-auto mt-2">
      <h1 class="text-center">Emails</h1>
      <div class="sendEmail">
        <button @click="SendEmail">Send a Test Email</button>
      </div>
      <hr />
      <div class="isLoading" v-if="isLoading">
        <Loading />
      </div>
      <div class="mails">
        <div class="shadow p-3 mb-5 bg-white rounded" v-for="mail in mails" :key="mail.id">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <div class="d-flex justify-content-between">
                  <h3>{{ mail.subject }}</h3>
                  <p>{{ mail.date }}</p>
                </div>
              </div>
              <div class="card-text">
                <div class="d-flex justify-content-between">
                  <p>
                    From:
                    <span class="small" v-html="mail.sender"></span>
                  </p>
                  <p>
                    To:
                    <span class="small" v-html="mail.recipient"></span>
                  </p>
                  <p v-if="mail.cc">
                    CC:
                    <span class="small" v-html="mail.cc"></span>
                  </p>
                  <p v-if="mail.bcc">
                    BCC:
                    <span class="small" v-html="mail.bcc"></span>
                  </p>
                </div>
                <div class="section">
                  <h2>Content</h2>
                  <p v-if="!mail.html">{{ mail.text }}</p>
                  <hr />
                  <div v-html="mail.html"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading/Page";
import { mapGetters } from "vuex";

export default {
  name: "Mail",
  components: {
    Loading
  },
  computed: {
    ...mapGetters(["isLoading", "successMessage", "errorMessage", "mails"])
  },
  methods: {
    SendEmail() {
      this.$store.dispatch("setLoading");
      this.$socket.client.emit("SendEmail", callback => {
        if (callback) {
          console.log("Success !");
        } else {
          console.error("Error !");
        }
      });
    }
  },
  mounted() {
    if (!this.$store.getters.mailInit) {
      this.$store.dispatch("setLoading");
    }
  }
};
</script>
