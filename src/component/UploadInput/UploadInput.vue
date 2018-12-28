<style lang="scss">
@import './UploadInput.scss';</style>
<script src="./UploadInput.js"></script>

<template>
	<div id="custom-file">
		<div class="input-group">
      <input type="text" class="form-control" placeholder="" :value="file.name" readonly style="border-radius:11px 0px 0px 11px">
      <span class="input-group-btn">
        <button style="color:white; background-color: #0b2e4d;border-radius: 0px 11px 11px 0px;height:100%;width:50px " class="btn btn-default btn-file" type="button" @click="launchFilePicker"><span  aria-hidden="true">+</span></button>
      </span>
    </div>

    <!-- REAL FILE INPUT HIDDEN -->
    <input type="file" style="display:none" ref="file" v-uploader multiple />
	</div>
</template>

