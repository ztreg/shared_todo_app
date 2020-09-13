<template>
  <q-page>
     
    <div class="text-h4 q-ma-md">Cookie Policy
        <div class="text-h5">
            What is a cookie?
        </div>
        <div class="text-body1 q-ma-sm">
         Cookies are usually small text files, given ID tags that are stored on your computer's browser directory or program data subfolders. Cookies are created when you use your browser to visit a website that uses cookies to keep track of your movements within the site, help you resume where you left off, remember your registered login, theme selection, preferences, and other customization functions.The website stores a corresponding file(with same ID tag)to the one they set in your browser and in this file they can track and keep information on your movements within the site and any information you may have voluntarily given while visiting the website, such as email address.
        </div>
    </div> 
        <div class=" q-ma-md">
        <div class="text-h5">
           What data are we storing inside cookies?
        </div>
        <div class="text-body1 q-ma-sm">
            - The data is saved inside session storage in four different session items:
            id, token, username and role.
        </div>
        <div class="text-body1 q-ma-sm">
           - We save that token string to display what user is signed in, what id you have and what role you have
        </div>
            <div class="text-body1 q-ma-sm">
            - The token is only saved as long as the session is active or if you destroy the token.
        </div>
    </div> 
        <div class="q-ma-md">
        <div class="text-h5">
           Why is that data saved?
        </div>
        <div class="text-body1 q-ma-sm">
          - We save that token to confirm your account information to make sure
you are who you say you are and keep you signed in on the service until the token expires.
        </div>
    </div> 
    <div class="q-ma-md">
        <div class="text-h5 ">
           How to remove our cookies
        </div>
        <div class="text-body1 q-ma-sm">
             - Clck the "Turn off cookies button when the page loads"
        </div>
    </div> 
  </q-page>
</template>

<script>
export default {
    name: 'CookiePolicyComponent',
    data () {
        return {}
    }
}
</script>

<style>

</style>