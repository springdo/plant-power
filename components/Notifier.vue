<template>
  <div>
    <img src="plant-icon.png" alt="">
    <!-- <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="m28 27c-8 0-8 6-8 6v-11h-4v11s0-6-8-6c-4 0-7-2-7-2s0 9 9 9h6s0 2 2 2 2-2 2-2h6c9 0 9-9 9-9s-3 2-7 2z" fill="#3e721d"/><path d="m21.125 27.662c-.328 0-.651-.097-.927-.283l-2.323-1.575-2.322 1.575c-.277.186-.601.283-.929.283-.143 0-.287-.018-.429-.057-.462-.123-.851-.441-1.06-.874l-1.225-2.527-2.797.204c-.04.002-.079.004-.119.004-.438 0-.86-.174-1.17-.484-.34-.342-.516-.81-.481-1.288l.201-2.8-2.523-1.225c-.432-.209-.751-.598-.876-1.062s-.042-.958.228-1.356l1.573-2.323-1.573-2.322c-.27-.398-.353-.892-.228-1.357.125-.462.444-.851.876-1.06l2.523-1.225-.201-2.797c-.034-.48.142-.951.481-1.289.31-.312.732-.485 1.17-.485.04 0 .079 0 .119.003l2.797.201 1.225-2.523c.209-.432.598-.751 1.06-.876.142-.038.285-.057.429-.057.328 0 .651.098.929.285l2.322 1.573 2.323-1.573c.275-.188.599-.285.927-.285.144 0 .29.02.428.057.465.125.854.444 1.062.876l1.225 2.523 2.8-.201c.037-.003.078-.003.116-.003.438 0 .858.173 1.172.485.338.338.515.809.48 1.289l-.204 2.797 2.527 1.225c.433.209.751.598.874 1.06.124.465.043.96-.227 1.357l-1.575 2.322 1.575 2.323c.269.398.351.892.227 1.356-.123.464-.441.852-.874 1.062l-2.527 1.225.204 2.8c.034.478-.143.946-.48 1.288-.313.311-.734.484-1.172.484-.038 0-.079-.002-.116-.004l-2.8-.204-1.225 2.527c-.209.433-.598.751-1.062.874-.139.04-.284.057-.428.057z" fill="#ffac33"/><circle cx="18" cy="14" fill="#732700" r="7"/></svg> -->
    <h3 style="text-align: center;">📬 Get Notified 📩 </h3>
    <p style="text-align: center;">👆 Just approve the notification request</p>

    <br/><br/>
    <div style="text-align: center;" >
      <button  class="button" @click="global.open('https://grafana.apps.microshift.is-in-the.cloud/', '_self')">📈 Grafana</button>
      <button  class="button" @click="global.open('https://prometheus.apps.microshift.is-in-the.cloud/', '_self')">⌗ Prometheus</button>
    </div>
    
    <button  class="button" style="width: 100%;" @click="swapBtn()">{{ button_msg }}</button>
    <br/><br/>
    
    <div v-if="show_hide" >
      <p>👨‍💻 ++++ Dev Stuff ++++ 🤓</p>
      <p>Device token is 
        <pre> {{ idToken }} </pre>
      </p>
      <p>Notification Message:</p>
      <pre>{{ message }}</pre>
      <p>Current URL</p>
      <pre>{{ url }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notifier',
  data() {
    return {
      listenersStarted: false,
      idToken: "",
      message: {},
      url: '',
      global: {},
      show_hide: false,
      button_msg: 'init'
    };
  },
  mounted() {
    this.startListeners();
    this.url = window.location.href;
    this.global = window;
    this.button_msg = (this.show_hide ? '🕵️‍♀️ Hide Dev Stuff' : '👀 Show Dev Stuff')
  },
  methods: {
    swapBtn(){
      this.show_hide=!this.show_hide
      this.button_msg = (this.show_hide ? '🕵️‍♀️ Hide Dev Stuff' : '👀 Show Dev Stuff')
    },
    // FCM NOTIFICATION FUNCTIONS
    async startListeners() {
      await this.startOnMessageListener();
      await this.startTokenRefreshListener();
      await this.requestPermission();
      await this.getIdToken();
      this.listenersStarted = true;
    },
    startOnMessageListener() {
      try {
        this.$fire.messaging.onMessage((payload) => {
          console.info("Message received : ", payload);
          console.log(payload.data);
          this.message = payload.data;
        });
      } catch (e) {
        console.error("Error : ", e);
      }
    },
    startTokenRefreshListener() {
      try {
        this.$fire.messaging.onTokenRefresh(async () => {
          try {
            await this.$fire.messaging.getToken();
          } catch (e) {
            console.error("Error : ", e);
          }
        });
      } catch (e) {
        console.error("Error : ", e);
      }
    },
    async requestPermission() {
      try {
        const permission = await Notification.requestPermission();
        console.log("GIVEN notify perms");
        console.log(permission);
      } catch (e) {
        console.error("Error : ", e);
      }
    },
    async getIdToken() {
      try {
        this.idToken = await this.$fire.messaging.getToken();
        console.log("TOKEN ID FOR this browser");
        console.log(this.idToken);
      } catch (e) {
        console.error("Error : ", e);
      }
    },
  },
};
</script>

<style>
img {
  width: 100%;
  height: auto;
}

pre {
 white-space: pre-wrap;
}

.button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>