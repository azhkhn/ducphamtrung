
<style lang="scss">
	@import './/B2b.scss';
</style>
<script src="./B2b.js"></script>

<template>
	<div class="mainb2b">
		<div style="left: 50%;top:60px;z-index: 9999;">
			<vue-simple-spinner v-if="$loading.anyLoading"></vue-simple-spinner>
		</div>
		<div class="router">
			<!-- <PageHeaderBlue class="headerblue"/> -->
			<router-view class="routerfix"></router-view>
			<FooterAll class="footerAll" />
		</div>
	</div>
</template>

