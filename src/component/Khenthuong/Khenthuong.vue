

<style lang="scss">
@import "./Khenthuong.scss";
</style>
<script src="./Khenthuong.js"></script>

<template>
	<div id="khenthuong">
		<br>
		<div class="infoHeader">
			<h4>Thêm khen thưởng</h4>
		</div>
		<div>
			<br>
			<p>Các trường có dấu * là bắt buộc phải nhập</p><br>
			<b-row>
				<b-col>
					<b-row>
						<b-col md="4" class="text-right mt-3">Tên khen thưởng:</b-col>
						<b-col>
							<b-form-input v-model="txtKhenthuong"
								type="text"
								placeholder="abc"></b-form-input>
						</b-col>
					</b-row>
					<br>
					<b-row>
						<b-col md="4" class="text-right mt-3">Hình thức khen thương (*):</b-col>
						<b-col>
							<b-form-input v-model="txtHinhthuc"
								type="text"
								placeholder="abc"></b-form-input>
						</b-col>
					</b-row>
					<br>
					<b-row>
						<b-col md="4" class="text-right mt-3">Số tiền thưởng:</b-col>
						<b-col>
							<b-form-input v-model="txtSotienthuong"
								type="number"
								placeholder="0"></b-form-input>
						</b-col>
					</b-row>
					<br>
					<b-row>
						<b-col md="4" class="text-right">Ghi chú:</b-col>
						<b-col>
							<b-form-textarea v-model="txtGhichu" :rows="3"
                     :max-rows="6"
								placeholder="abc"></b-form-textarea>
						</b-col>
					</b-row>
					<br>
					<b-row>
						<b-col md="4"></b-col>
						<b-col>
							 <b-button  variant="primary">
								Thêm
							</b-button>
						</b-col>
					</b-row>
					<b-row>
						<b-col md="4"></b-col>
						<b-col></b-col>
					</b-row>
				</b-col>
				<b-col>

				</b-col>
			</b-row>
		</div>
	</div>
</template>

