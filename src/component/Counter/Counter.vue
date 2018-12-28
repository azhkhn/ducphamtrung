<style src="./Counter.scss" module lang="scss"></style>
<script src="./Counter.js"></script>

<template>
	<div>
    <b-row>
      <b-col md="5" offset-md="2">
	 <b-tabs>
  <b-tab title="first" active>
    I'm the first fading tab
  </b-tab>
  <b-tab title="second" >
    I'm the second tab content
  </b-tab>
  <b-tab title="disabled" disabled>
    Disabled tab!
  </b-tab>
</b-tabs>
      </b-col>
    </b-row>
	</div>
</template>

