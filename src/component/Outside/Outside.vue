
<style lang="scss">
@import "./Outside.scss";
</style>
<script src="./Outside.js"></script>

<template>
	<div class="outsize">
		<PageHeader/>
		<div style="position: absolute;left: 50%;top:60px;z-index: 9999999999999;">
			<vue-simple-spinner v-if="$loading.anyLoading"></vue-simple-spinner>
		</div>
		<div>
		<router-view></router-view>
		</div>
		<FooterAll class="footer" />
	</div>
</template>

