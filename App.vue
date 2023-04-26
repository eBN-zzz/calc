<script>
export default {
	onLaunch: function() {
		console.log('App Launch')
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>
/*每个页面公共css */
@font-face {
	font-family: 'robotoregular';
	src: url('/static/Roboto-Regular-webfont.woff') format('woff');
	font-weight: normal;
	font-style: normal;
}
page {
	width: 750rpx;
	height: 100%;
	font-family: robotoregular, PingFang SC, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, serif;
}
</style>
