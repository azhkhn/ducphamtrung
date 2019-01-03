<style src="./Member.scss" module lang="scss"></style>
<script src="./Member.js"></script>

<template>
	<div>
		<b-row>
			<b-col class="ml-3">
				<!-- <h4>Danh sách phòng ban</h4> -->
			</b-col>
			<b-col class="text-right mr-3">
				<b-button variant="primary" @click="ModalCreat">Thêm mới Người dùng</b-button>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col>
				<md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card >
					<md-table-toolbar>
						<div class="md-toolbar-section-start">
						<h1 class="md-title">Danh sách người dùng</h1>
						</div>

						<md-field md-clearable class="md-toolbar-section-end">
						<md-input placeholder="Tìm kiếm theo tên..." v-model="search" @input="searchOnTable" />
						</md-field>
					</md-table-toolbar>
					<md-table-row slot="md-table-row" slot-scope="{ item }">
						<md-table-cell md-label="Tên đăng nhập" md-sort-by="id" >{{ item.username }}</md-table-cell>
						<md-table-cell md-label="Tên đầy đủ" md-sort-by="name">{{ item.fullname }}</md-table-cell>
						<md-table-cell md-label="E-mail" md-sort-by="email">{{ item.email }}</md-table-cell>
						<md-table-cell md-label="Điện thoại" md-sort-by="phone">{{ item.phone }}</md-table-cell>
						<md-table-cell md-label="Ngày tạo" md-sort-by="createdDate">{{ item.createdDate }}</md-table-cell>
						<md-table-cell md-label="Người tạo" md-sort-by="createdBy">{{ item.createdBy }}</md-table-cell>
						<md-table-cell md-label="Trạng thái" md-sort-by="gender" >
							<md-switch v-model="item.active" class="md-primary" @change="showModalStatus(item)" :disabled="item.active===false"></md-switch>
						</md-table-cell>
						<md-table-cell md-label="Hành động" md-sort-by="note">
							<div style="width:110px">
								<span><b-button variant="link" style="width:50px" @click="edit(item)"><img src="~icons/edit-blue.png" style="width:23px;height:23px"/></b-button></span>
								<!-- <span>
									<b-button variant="link" style="width:50px" @click="modalSetting(item)">
										<img src="~icons/delete-red.png" style="width:23px;height:23px"/>
									</b-button>
								</span> -->
							</div>
						</md-table-cell>
						<md-table-cell md-label="Ghi chú" md-sort-by="note">{{ item.note }}</md-table-cell>
					</md-table-row>
				</md-table>
			</b-col>
		</b-row>
		<b-modal id="Creat" hide-footer hide-header >
			<b-row>
				<b-col class="text-center"><b>Thêm mới người dùng</b></b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Tên đăng nhập</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Id" label-text-align="right" >
										<b-form-input id="Id" type="text" name="Id" :formatter="format" v-model.trim="itemAdd.username" ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="itemAdd.username === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Tên đầy đủ</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemAdd.fullname" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemAdd.fullname === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<!--  -->
					<b-row>
						<b-col>
							<b-row>
								<b-col>Số điện thoại</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemAdd.phoneNumber" ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="phonenumber(itemAdd.phoneNumber)===false ">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>
									<b-row>
										<b-col>E-mail</b-col>
									</b-row>
									<b-row>
										<b-col>
											<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
												<b-form-input id="Name" type="text"  v-model.trim="itemAdd.email" name="Name" size="md" maxlength="50"></b-form-input>
											</b-form-group>
											<b-row>
												<b-col>
													<span class="text-danger" v-if="itemAdd.email === ''">
														{{$t('ValidateLocation_cb_AvaiSearch')}}
													</span>
												</b-col>
											</b-row>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Mật khẩu</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemAdd.password" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemAdd.password === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Ghi chú</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-textarea id="textarea1"
														 v-model.trim="itemAdd.note"
														placeholder="Enter something"
														:rows="3"
														:max-rows="6">
										</b-form-textarea>
									</b-form-group>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col class="text-center">
					<b-button variant="primary" style="width:100px" @click="CreatUser">Thêm mới</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('Edit')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
		<b-modal id="Edit" hide-footer hide-header >
			<b-row>
				<b-col class="text-center"><b>Chỉnh sửa thông tin người dùng</b></b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Tên đăng nhập</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Id" label-text-align="right" >
										<b-form-input id="Id" type="text" name="Id" :formatter="format" v-model.trim="itemEdit.username" ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="itemEdit.username === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Tên đầy đủ</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemEdit.fullname" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemEdit.fullname === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<!--  -->
					<b-row>
						<b-col>
							<b-row>
								<b-col>Số điện thoại</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemEdit.phoneNumber" ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="phonenumber(itemEdit.phoneNumber)===false ">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>
									<b-row>
										<b-col>E-mail</b-col>
									</b-row>
									<b-row>
										<b-col>
											<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
												<b-form-input id="Name" type="text"  v-model.trim="itemEdit.email" name="Name" size="md" maxlength="50"></b-form-input>
											</b-form-group>
											<b-row>
												<b-col>
													<span class="text-danger" v-if="itemEdit.email === ''">
														{{$t('ValidateLocation_cb_AvaiSearch')}}
													</span>
												</b-col>
											</b-row>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Ghi chú</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-textarea id="textarea1"
														 v-model.trim="itemEdit.note"
														placeholder="Enter something"
														:rows="3"
														:max-rows="6">
										</b-form-textarea>
									</b-form-group>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col class="text-center">
					<b-button variant="primary" style="width:100px" @click="EditMember">Cập nhật</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('Edit')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
		<b-modal id="Deactive" hide-footer hide-header >
			<b-row>
				<b-col>
					<h5 class="text-center">Xác nhận ngùng hoạt động với</h5>
					<p><b>Tên đăng nhập:</b> {{itemModal.username}}</p>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col class="text-center">
					<b-button variant="primary" style="width:100px" @click="Deactive(itemModal)">Xác nhận</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('Deactive')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
	</div>
</template>

