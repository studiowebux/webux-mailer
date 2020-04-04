<template>
  <div class="home">
    <Mail />
  </div>
</template>

<script>
// @ is an alias to /src
import Mail from "@/components/Mail.vue";

export default {
  name: "Home",
  components: {
    Mail
  }
};
</script>
