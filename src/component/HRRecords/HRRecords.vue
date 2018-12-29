<style lang="scss">
@import "./HRRecords.scss";
</style>
<script src="./HRRecords.js"></script>

<template>
	<div id="HRRecords">
		<b-row>
			<b-col class="ml-4 mt-3">
				<b >Danh sách nhân sự</b>
			</b-col>
			<b-col class="text-right mr-4">
				<b-button variant="primary" @click="AddUser">Thêm nhân viên</b-button>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col>
				<md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header class="tablekt" @md-selected="onSelect">
					<md-table-toolbar >
						<md-field md-clearable class="md-toolbar-section-end">
						<md-input
							placeholder="Search by name..."
							v-model="search"
							@input="searchOnTable"/>
						</md-field>
					</md-table-toolbar>
					<md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" md-auto-select >
						<md-table-cell md-label="STT" md-sort-by="id" md-numeric class="text-center">{{ item.id }}</md-table-cell>
						<md-table-cell md-label="Tên nhân viên" md-sort-by="title">{{ item.title }}</md-table-cell>
						<md-table-cell md-label="Phòng ban" md-sort-by="title">{{ item.title }}</md-table-cell>
						<md-table-cell md-label="Chức vụ" md-sort-by="title">{{ item.title }}</md-table-cell>
						<md-table-cell md-label="Ngày vào" md-sort-by="name">{{ item.name }}</md-table-cell>
						<md-table-cell md-label="Địa chỉ" md-sort-by="email">{{ item.email }}</md-table-cell>
						<md-table-cell md-label="Giới tính" md-sort-by="gender">{{ item.gender }}</md-table-cell>
						<md-table-cell md-label="Số điện thoại" md-sort-by="title">{{ item.title }}</md-table-cell>
						<md-table-cell md-label="Trạng thái" md-sort-by="title" class="text-center"><md-switch v-model="item.status" class="md-primary" @change="showModalStatus(item)"></md-switch></md-table-cell>
						<md-table-cell md-label="Hành động" md-sort-by="title" class="text-center">
							<!-- <div style="width:110px">
								<span><b-button variant="link" style="width:50px"><img src="~icons/edit-blue.png" style="width:23px;height:23px"/></b-button></span>
								<span> -->
									<b-button variant="link" style="width:50px" @click="modalSetting(item)">
										<img src="~icons/delete-red.png" style="width:23px;height:23px"/>
									</b-button>
								<!-- </span>
							</div> -->
						</md-table-cell>
					</md-table-row>
				</md-table>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col>
				<h5 class="ml-5"><b>Thông tin chi tiết / Chỉnh sửa thông tin</b></h5>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col>
				<md-tabs md-sync-route>
				 	<md-tab id="tab-home" md-label="Thông tin cá nhân" to="">
						<b-row>
							<b-col>
								<b-row>
									<b-col>
										<b-container>
											<b-row>
												<b-col>
													<b-row>
														<b-col>{{$t('USERNAME_PROFILE')}}</b-col>
													</b-row>
													<b-row>
														<b-col>
															<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
																<b-form-input id="userName" type="text" name="userName" :formatter="format" v-model.trim="item.userName" ></b-form-input>
															</b-form-group>
															<!-- <b-form-group  class="validateProfile"  label-size="md"	label-for="userName" label-text-align="right" >
																<b-form-input id="userName" disabled type="text" name="userName" v-model.trim="item.userName" ></b-form-input>
															</b-form-group> -->
															<b-row >
																<b-col >
																	<span class="text-danger" v-if="errorAgent===false && item.userName === ''">
																		{{$t('ValidateLocation_cb_AvaiSearch')}}
																	</span>
																	<span class="text-danger" v-if="errorAddUserAgent===false">
																		{{$t('REGISTER_ERROR')}}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
												<b-col>
													<b-row>
														<b-col>{{$t('FULL_NAME_PROFILE')}}</b-col>
													</b-row>
													<b-row>
														<b-col>
															<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
																<b-form-input id="fullNameEdit" type="text"  v-model.trim="item.fullName" name="fullName" size="md" maxlength="50"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col>
																	<span class="text-danger" v-if="errorAgent===false && item.fullName === ''">
																		{{$t('ValidateLocation_cb_AvaiSearch')}}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<!--end row username and fullname -->
											<b-row>
												<b-col>
													<b-row>
														<b-col>{{$t('PASSWORD_LBL_LOGIN')}}</b-col>
													</b-row>
													<b-row>
														<b-col >
															<b-form-group  class="validateProfile"  label-size="md" label-for="passwordUser" label-text-align="right">
																<b-form-input id="passwordUser" type="password" name="password" v-model.trim="item.password" ></b-form-input>
															</b-form-group>
															<b-row >
																<b-col >
																<span class="text-danger" v-if="errorAgent === false && item.password.length < 8">
																	{{ $t('PASSWORD_ERROR_REQUIRED') }}
																</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
												<b-col>
													<b-row>
														<b-col>gender</b-col>
													</b-row>
													<b-row>
														<b-col>
															<b-row>
																<b-col md="4">
																	<b-button :variant="variantEditUserGentlemen" size="md"  @click="genderEditUser(1)"
																		style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Gentlemen')}}
																	</b-button>
																</b-col>
																<b-col>
																	<b-button :variant="variantEditUserLady" size="md" @click="genderEditUser(0)"
																		style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Lady')}}
																	</b-button>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<!-- end row password and gender -->
											<b-row>
												<b-col>
														<b-row>
															<b-col>{{$t('Designation1_REGISTER')}}</b-col>
														</b-row>
														<b-row>
															<b-col>
															<b-form-group  class="validateProfile"  label-size="md"  label-for="designationEditUser" label-text-align="right">
																		<b-form-input id="designationEditUser" type="text" name="designation" v-model="item.designation"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col>
																	<span class="text-danger" v-if="errorAgent===false && item.designation === ''">
																		{{$t('ValidateLocation_cb_AvaiSearch')}}
																	</span>
																</b-col>
															</b-row>
															</b-col>
													</b-row>
												</b-col>
												<b-col>
													<b-row>
														<b-col>{{$t('MOBILE_PROFILE')}}</b-col>
													</b-row>
													<b-row>
														<b-col>
															<b-form-group  class="validateProfile" label-size="md" label-for="mobileEditUser" label-text-align="right">
																		<b-form-input id="mobileEditUser" type="text" name="mobile" v-model="item.mobile" ></b-form-input>
															</b-form-group>
															<b-row>
																<b-col>
																	<span class="text-danger" v-if="checkTelephone===false">
																		{{$t('ERROR_PHONE')}}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<!--end row designation and mobile -->
											<b-row>
												<b-col>
													<b-row>
														<b-col>{{$t('ADDRESS_PROFILE')}}</b-col>
													</b-row>
													<b-row >
														<b-col>
														<b-form-group class="validateProfile" label-size="md"  label-for="Address" label-text-align="right">
															<b-form-input id="address" type="text"   v-model="item.address" name="Address" size="md"></b-form-input>
														</b-form-group>
														<b-row>
															<b-col>
																<span class="text-danger" v-if="errorAgent===false && item.address === ''">
																	{{$t('ValidateLocation_cb_AvaiSearch')}}
																</span>
															</b-col>
														</b-row>
														</b-col>
													</b-row>
												</b-col>
												<b-col>
													<b-row>
														<b-col>{{$t('Email')}}</b-col>
													</b-row>
													<b-row>
														<b-col>
														<b-form-group class="validateProfile" label-size="md"  label-for="email" label-text-align="right">
															<b-form-input id="email" type="text"  v-model="item.email" name="email" size="md"></b-form-input>
														</b-form-group>
														<b-row>
															<b-col>
																<span class="text-danger" v-if="errorAgent===false && item.email === ''">
																	{{$t('ValidateLocation_cb_AvaiSearch')}}
																</span>
																<span class="text-danger" v-if="validateEmail(item.email) === false && item.email !== ''">
																	{{$t('EMAILADDRESS_ERROR_REQUIRED')}}
																</span>
															</b-col>
														</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<!-- end row address and email -->
											<b-row>
												<b-col>
													<br>
													<b-row style="padding-left:10px">
														<b-col md="1">
																<b-form-group class="validateProfile"  label-size="md" label-for="active"  label-text-align="right">
																	<b-form-checkbox v-model="item.status" id="active" name="active"  value="true" unchecked-value="false"></b-form-checkbox>
																</b-form-group>
														</b-col>
														<b-col >{{$t('Status_row_AffiliateNetwork')}}</b-col>
													</b-row>
												</b-col>
												<b-col>
													<b-row>
														<b-col>{{$t('ACCESS_PROFILE')}}</b-col>
													</b-row>
													<b-row>
														<b-col>
															<b-row>
																<b-col md="4">
																	<b-button :variant="variantEditUserAdmin" size="md"  @click="RoleEditUser(item.role,'ROLE_TRAVEL_AGENT_ADMIN')"
																		style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Admin')}}
																	</b-button>
																</b-col>
																<b-col >
																	<b-button :variant="variantEditUserUser" size="md" @click="RoleEditUser(item.role,'ROLE_TRAVEL_AGENT_USER')"
																		style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('User')}}
																	</b-button>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<!-- end row status and access -->
											<br>
											<!-- start row button save and cancel -->
											<!-- <div class="text-center">
												<b-button variant="primary" class="btn-yellow" size="md" @click.stop="editUserAgent(item)" style=" width: 200px;height: 40px;  border-radius: 5px; background-color:  #258fe0;">
													{{$t('Save')}}
												</b-button>
											</div> -->
											<!-- end row button save and cancel -->
										</b-container>
									</b-col>
								</b-row>
							</b-col>
							<b-col md="4" class="mt-4">
								<b-card title=""
										:img-src="previewImage"
										img-alt="Image"
										img-top
										tag="article"
										style="max-width: 151.1811023622px;"
										class="">
									<md-field>
										<input type="file" accept="image/jpeg" @change='uploadImage'>
									</md-field>
								</b-card>
							</b-col>
						</b-row>
					</md-tab>

					<md-tab id="tab-pages" md-label="Thân nhân" to="">
						Pages tab
						<p>Unde provident nemo reiciendis officia, possimus repellendus. Facere dignissimos dicta quis rem. Aliquam aspernatur dolor atque nisi id deserunt laudantium quam repellat.</p>
					</md-tab>

					<md-tab id="tab-posts" md-label="Quá trình công tác" to="">
						Posts tab
						<p>Qui, voluptas repellat impedit ducimus earum at ad architecto consectetur perferendis aspernatur iste amet ex tempora animi, illum tenetur quae assumenda iusto.</p>
					</md-tab>

				</md-tabs>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col class="ml-5">
				<b-row>
					<b-col md="4">
						<b-button variant="success" style="width:150px">Khen thưởng</b-button>
						<b-button variant="danger" style="width:150px">Kỷ luật</b-button>
					</b-col>
					<b-col class="text-right">
						<b-button variant="primary" style="width:250px">
							Cập nhật
						</b-button>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
	<!-- modal thêm nhân viên -->
		<b-modal id="addUer" hide-footer hide-header @hide="resetModal" size="lg">
			<b-row>
				<b-col class="ml-3">
					<h4>Thêm nhân viên</h4>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
					<b-row>
						<b-col>
							<b-container>
								<b-row>
									<b-col>
										<b-row>
											<b-col>{{$t('USERNAME_PROFILE')}}</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-input id="userName" type="text" name="userName" :formatter="format" v-model.trim="itemAdd.userName" ></b-form-input>
												</b-form-group>
												<!-- <b-form-group  class="validateProfile"  label-size="md"	label-for="userName" label-text-align="right" >
													<b-form-input id="userName" disabled type="text" name="userName" v-model.trim="item.userName" ></b-form-input>
												</b-form-group> -->
												<b-row >
													<b-col >
														<span class="text-danger" v-if="errorAgent===false && itemAdd.userName === ''">
															{{$t('ValidateLocation_cb_AvaiSearch')}}
														</span>
														<span class="text-danger" v-if="errorAddUserAgent===false">
															{{$t('REGISTER_ERROR')}}
														</span>
													</b-col>
												</b-row>
											</b-col>
										</b-row>
									</b-col>
									<b-col>
										<b-row>
											<b-col>{{$t('FULL_NAME_PROFILE')}}</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
													<b-form-input id="fullNameEdit" type="text"  v-model.trim="itemAdd.fullName" name="fullName" size="md" maxlength="50"></b-form-input>
												</b-form-group>
												<b-row>
													<b-col>
														<span class="text-danger" v-if="errorAgent===false && itemAdd.fullName === ''">
															{{$t('ValidateLocation_cb_AvaiSearch')}}
														</span>
													</b-col>
												</b-row>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--end row username and fullname -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>{{$t('PASSWORD_LBL_LOGIN')}}</b-col>
										</b-row>
										<b-row>
											<b-col >
												<b-form-group  class="validateProfile"  label-size="md" label-for="passwordUser" label-text-align="right">
													<b-form-input id="passwordUser" type="password" name="password" v-model.trim="itemAdd.password" ></b-form-input>
												</b-form-group>
												<b-row >
													<b-col >
													<span class="text-danger" v-if="errorAgent === false && itemAdd.password.length < 8">
														{{ $t('PASSWORD_ERROR_REQUIRED') }}
													</span>
													</b-col>
												</b-row>
											</b-col>
										</b-row>
									</b-col>
									<b-col>
										<b-row>
											<b-col>gender</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-row>
													<b-col >
														<b-button :variant="variantEditUserGentlemen" size="md"  @click="genderEditUser(1)"
															style=" width: 80px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Gentlemen')}}
														</b-button>
													</b-col>
													<b-col>
														<b-button :variant="variantEditUserLady" size="md" @click="genderEditUser(0)"
															style=" width: 80px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Lady')}}
														</b-button>
													</b-col>
												</b-row>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!-- end row password and gender -->
								<b-row>
									<b-col>
											<b-row>
												<b-col>{{$t('Designation1_REGISTER')}}</b-col>
											</b-row>
											<b-row>
												<b-col>
												<b-form-group  class="validateProfile"  label-size="md"  label-for="designationEditUser" label-text-align="right">
															<b-form-input id="designationEditUser" type="text" name="designation" v-model="itemAdd.designation"></b-form-input>
												</b-form-group>
												<b-row>
													<b-col>
														<span class="text-danger" v-if="errorAgent===false && itemAdd.designation === ''">
															{{$t('ValidateLocation_cb_AvaiSearch')}}
														</span>
													</b-col>
												</b-row>
												</b-col>
										</b-row>
									</b-col>
									<b-col>
										<b-row>
											<b-col>{{$t('MOBILE_PROFILE')}}</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile" label-size="md" label-for="mobileEditUser" label-text-align="right">
															<b-form-input id="mobileEditUser" type="text" name="mobile" v-model="itemAdd.mobile" ></b-form-input>
												</b-form-group>
												<b-row>
													<b-col>
														<span class="text-danger" v-if="checkTelephone===false">
															{{$t('ERROR_PHONE')}}
														</span>
													</b-col>
												</b-row>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--end row designation and mobile -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>{{$t('ADDRESS_PROFILE')}}</b-col>
										</b-row>
										<b-row >
											<b-col>
											<b-form-group class="validateProfile" label-size="md"  label-for="Address" label-text-align="right">
												<b-form-input id="address" type="text"   v-model="itemAdd.address" name="Address" size="md"></b-form-input>
											</b-form-group>
											<b-row>
												<b-col>
													<span class="text-danger" v-if="errorAgent===false && itemAdd.address === ''">
														{{$t('ValidateLocation_cb_AvaiSearch')}}
													</span>
												</b-col>
											</b-row>
											</b-col>
										</b-row>
									</b-col>
									<b-col>
										<b-row>
											<b-col>{{$t('Email')}}</b-col>
										</b-row>
										<b-row>
											<b-col>
											<b-form-group class="validateProfile" label-size="md"  label-for="email" label-text-align="right">
												<b-form-input id="email" type="text"  v-model="itemAdd.email" name="email" size="md"></b-form-input>
											</b-form-group>
											<b-row>
												<b-col>
													<span class="text-danger" v-if="errorAgent===false && itemAdd.email === ''">
														{{$t('ValidateLocation_cb_AvaiSearch')}}
													</span>
													<span class="text-danger" v-if="validateEmail(itemAdd.email) === false && itemAdd.email !== ''">
														{{$t('EMAILADDRESS_ERROR_REQUIRED')}}
													</span>
												</b-col>
											</b-row>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!-- end row address and email -->
								<b-row>
									<b-col>
										<br>
										<b-row style="padding-left:10px">
											<b-col md="3">
													<b-form-group class="validateProfile"  label-size="md" label-for="active"  label-text-align="right">
														<b-form-checkbox v-model="itemAdd.status" id="active" name="active"  value="true" unchecked-value="false"></b-form-checkbox>
													</b-form-group>
											</b-col>
											<b-col >{{$t('Status_row_AffiliateNetwork')}}</b-col>
										</b-row>
									</b-col>
									<b-col>
										<b-row>
											<b-col>{{$t('ACCESS_PROFILE')}}</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-row>
													<b-col >
														<b-button :variant="variantEditUserAdmin" size="md"  @click="RoleEditUser(itemAdd.role,'ROLE_TRAVEL_AGENT_ADMIN')"
															style=" width: 80px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Admin')}}
														</b-button>
													</b-col>
													<b-col >
														<b-button :variant="variantEditUserUser" size="md" @click="RoleEditUser(itemAdd.role,'ROLE_TRAVEL_AGENT_USER')"
															style=" width: 80px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('User')}}
														</b-button>
													</b-col>
												</b-row>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!-- end row status and access -->
								<br>
							</b-container>
						</b-col>
					</b-row>
				</b-col>
				<b-col md="4" class="mt-4">
					<b-card title=""
							img-src="https://picsum.photos/600/300/?image=25"
							img-alt="Image"
							img-top
							tag="article"
							style="max-width: 151.1811023622px;"
							class="">
						<md-field>
							<label>Chọn ảnh</label>
							<md-file v-model="singleAdd" accept="image/*" />
						</md-field>
					</b-card>
				</b-col>
			</b-row>
			<b-row>
				<b-col class="text-right">
					<b-button variant="warning" @click="Cancel('addUer')">Hủy bỏ</b-button>
					<b-button variant="primary" style="width:100px">Thêm</b-button>
				</b-col>
			</b-row>
		</b-modal>
		<b-modal id="setting" hide-footer hide-header >
			<b-row>
				<b-col>
					<h5 class="text-center">Xác nhận xóa</h5>
					<p><b>Nhân viên:</b> {{itemModal.name}}</p>
					<p><b>Phòng ban:</b> {{itemModal.title}}</p>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col class="text-center">
					<b-button variant="primary" style="width:100px">Xác nhận</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('setting')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
		 <md-dialog-confirm
			:md-active.sync="active"
			md-title="Xác nhận hủy hoạt động với tài khoản"
			md-content=""
			md-confirm-text="Agree"
			md-cancel-text="Disagree"
			@md-cancel="onCancel"
			@md-confirm="onConfirm" />

	</div>
</template>

