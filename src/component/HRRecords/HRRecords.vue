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
				<md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card   class="tablekt" @md-selected="onSelect" md-fixed-header>
					<md-table-toolbar >
						<md-field md-clearable class="md-toolbar-section-end">
						<md-input
							placeholder="Search by name..."
							v-model="search"
							@input="searchOnTable"/>
						</md-field>
					</md-table-toolbar>
					<md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" md-auto-select >
						<md-table-cell md-label="ID" md-sort-by="id" class="text-center">{{ item.id }}</md-table-cell>
						<md-table-cell md-label="Tên nhân viên" md-sort-by="fullname">{{ item.fullname }}</md-table-cell>
						<md-table-cell md-label="Phòng ban" md-sort-by="departmentName">{{ item.departmentName }}</md-table-cell>
						<md-table-cell md-label="Chức vụ" md-sort-by="positionName">{{ item.positionName }}</md-table-cell>
						<md-table-cell md-label="Ngày vào" md-sort-by="dayInCompany">{{ item.dayInCompany | moment('DD/MM/YYYY') }}</md-table-cell>
						<md-table-cell md-label="email" md-sort-by="email">{{ item.email }}</md-table-cell>
						<md-table-cell md-label="Giới tính" md-sort-by="gender">
							<span v-if="item.gender === 0">Nữ</span>
							<span v-else>Nam</span>
						</md-table-cell>
						<md-table-cell md-label="Số điện thoại" md-sort-by="phone">{{ item.phone }}</md-table-cell>
						<md-table-cell md-label="Trạng thái" md-sort-by="active" class="text-center"><md-switch v-model="item.active" class="md-primary" @change="showModalStatus(item)"></md-switch></md-table-cell>
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
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>ID</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-input id="userName" type="text" name="userName" :formatter="format" v-model.trim="itemEdit.id" disabled></b-form-input>
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Tên đầy đủ</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-input id="userName" type="text" name="userName" :formatter="format" v-model.trim="itemEdit.fullname" ></b-form-input>
												</b-form-group>
												<b-row >
													<b-col >
														<span class="text-danger" v-if="errorAgent===false && itemEdit.fullname === ''">
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
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Ngày sinh</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group label-size="md" style="position: relative;"
														label-for="fromDate"
														label-text-align="left"
														>
														<datepicker  v-model="itemEdit.birthday" name="uniquename" :language="vi" format="dd-MM-yyyy" ></datepicker>
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Giới tính</b-col>
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
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Điện thoại</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-row >
													<b-col>
														<b-form-group  class="validateProfile" label-size="md" label-for="mobileEditUser" label-text-align="right">
																	<b-form-input id="mobileEditUser" type="text" name="mobile" v-model="itemEdit.phone" ></b-form-input>
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
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>E-mail</b-col>
										</b-row>
										<b-row>
											<b-col>
											<b-form-group class="validateProfile" label-size="md"  label-for="email" label-text-align="right">
												<b-form-input id="email" type="text"  v-model="itemEdit.email" name="email" size="md"></b-form-input>
											</b-form-group>
											<b-row>
												<b-col>
													<span class="text-danger" v-if="errorAgent===false && itemEdit.email === ''">
														{{$t('ValidateLocation_cb_AvaiSearch')}}
													</span>
													<span class="text-danger" v-if="validateEmail(itemEdit.email) === false && itemEdit.email !== ''">
														{{$t('EMAILADDRESS_ERROR_REQUIRED')}}
													</span>
												</b-col>
											</b-row>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
							</b-col>
							<b-col>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Ngày biên chế</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group label-size="md"
														label-for="fromDate"
														label-text-align="left"
														>
														<datepicker  v-model="itemEdit.payrollDay" name="uniquename" :language="vi" format="dd-MM-yyyy" ></datepicker>
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Ngày vào công ty</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group label-size="md"
														label-for="fromDate"
														label-text-align="left"
														>
														<datepicker  v-model="itemEdit.dayInCompany" name="uniquename" :language="vi" format="dd-MM-yyyy" ></datepicker>
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Trình độ học vấn</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-select v-model="itemEdit.educationLevel" :options="educationLevel"  />
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Trình độ ngoại ngữ</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-select v-model="itemEdit.languageLevel" :options="languageLevel" />
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Địa chỉ tạm trú</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													 <b-form-textarea id="textarea1"
																	v-model="itemEdit.currentAddress"
																	placeholder="Enter something"
																	:rows="4"
																	:max-rows="6">
													</b-form-textarea>
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
							</b-col>
						</b-row>
					</md-tab>
<!--
					<md-tab id="tab-pages" md-label="Thân nhân" to="">
						Pages tab
						<p>Unde provident nemo reiciendis officia, possimus repellendus. Facere dignissimos dicta quis rem. Aliquam aspernatur dolor atque nisi id deserunt laudantium quam repellat.</p>
					</md-tab>

					<md-tab id="tab-posts" md-label="Quá trình công tác" to="">
						Posts tab
						<p>Qui, voluptas repellat impedit ducimus earum at ad architecto consectetur perferendis aspernatur iste amet ex tempora animi, illum tenetur quae assumenda iusto.</p>
					</md-tab> -->

				</md-tabs>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col class="ml-5">
				<b-row>
					<!-- <b-col md="4">
						<b-button variant="success" style="width:150px">Khen thưởng</b-button>
						<b-button variant="danger" style="width:150px">Kỷ luật</b-button>
					</b-col> -->
					<b-col class="text-right">
						<b-button variant="primary" @click="update" style="width:250px">
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
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>ID</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-input id="userName" type="text" name="userName" :formatter="format" v-model.trim="itemAdd.id"></b-form-input>
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Tên đầy đủ</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-input id="userName" type="text" name="userName" :formatter="format" v-model.trim="itemAdd.fullname" ></b-form-input>
												</b-form-group>
												<b-row >
													<b-col >
														<span class="text-danger" v-if="errorAgent===false && itemAdd.fullname === ''">
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
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Ngày sinh</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group label-size="md" style="position: relative;"
														label-for="fromDate"
														label-text-align="left"
														>
														<datepicker  v-model="itemAdd.birthday" name="uniquename" :language="vi" format="dd-MM-yyyy" ></datepicker>
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Giới tính</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-row>
													<b-col >
														<b-button :variant="variantEditUserGentlemen" size="md"  @click="genderAddUser(1)"
															style=" width: 80px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Gentlemen')}}
														</b-button>
													</b-col>
													<b-col>
														<b-button :variant="variantEditUserLady" size="md" @click="genderAddUser(0)"
															style=" width: 80px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Lady')}}
														</b-button>
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
											<b-col>Điện thoại</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-row >
													<b-col>
														<b-form-group  class="validateProfile" label-size="md" label-for="mobileEditUser" label-text-align="right">
																	<b-form-input id="mobileEditUser" type="text" name="mobile" v-model="itemAdd.phone" ></b-form-input>
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
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>E-mail</b-col>
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
								<b-row>
									<b-col>
										<b-row>
											<b-col>Trình độ ngoại ngữ</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-select v-model="itemAdd.languageLevel" :options="languageLevel" />
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
							</b-col>
							<b-col>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Ngày biên chế</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group label-size="md"
														label-for="fromDate"
														label-text-align="left"
														>
														<datepicker  v-model="itemAdd.payrollDay" name="uniquename" :language="vi" format="dd-MM-yyyy" ></datepicker>
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Ngày vào công ty</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group label-size="md"
														label-for="fromDate"
														label-text-align="left"
														>
														<datepicker  v-model="itemAdd.dayInCompany" name="uniquename" :language="vi" format="dd-MM-yyyy" ></datepicker>
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Trình độ học vấn</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-select v-model="itemAdd.educationLevel" :options="educationLevel"  />
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->

								<b-row>
									<b-col>
										<b-row>
											<b-col>Thành phố</b-col>
										</b-row>
										<b-row>
											<b-col>
												<!-- <b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-select v-model="itemAdd.thanhPho" :options="listthanhpho" />
												</b-form-group> -->
												<b-form-select  class="input-radius" plain  v-validate="'required'" id="city" type="text"  name="city" size="md" v-model.trim="itemAdd.thanhPho">
													<option v-for="option in listthanhpho" :value="option.code" >{{option.name}}</option>
												</b-form-select>
											</b-col>
										</b-row>
									</b-col>
									<b-col>
										<b-row>
											<b-col>Quận huyện</b-col>
										</b-row>
										<b-row>
											<b-col>
												<!-- <b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													<b-form-select v-model="itemAdd.quanHuyen" :options="languageLevel" />
												</b-form-group> -->
												<b-form-select  class="input-radius" plain  v-validate="'required'" id="quanHuyen" type="text"  name="quanHuyen" size="md" v-model.trim="itemAdd.quanHuyen">
													<option v-for="option in listquanhuyen" :value="option.code" >{{option.name}}</option>
												</b-form-select>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<b-row>
									<b-col>
										<b-row>
											<b-col>Phường xã</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-select  class="input-radius" plain  v-validate="'required'" id="phuongXa" type="text"  name="phuongXa" size="md" v-model.trim="itemAdd.phuongXa">
													<option v-for="option in listphuongxa" :value="option.id" >{{option.name}}</option>
												</b-form-select>{{itemAdd.phuongXa}}
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
								<b-row>
									<b-col>
										<b-row>
											<b-col>Địa chỉ tạm trú</b-col>
										</b-row>
										<b-row>
											<b-col>
												<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" >
													 <b-form-textarea id="textarea1"
																	v-model="itemAdd.currentAddress"
																	placeholder="Enter something"
																	:rows="4"
																	:max-rows="6">
													</b-form-textarea>
												</b-form-group>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<!--  -->
							</b-col>
						</b-row>
			<b-row>
				<b-col class="text-right">
					<b-button variant="warning" @click="Cancel('addUer')">Hủy bỏ</b-button>
					<b-button variant="primary" style="width:100px" @click="creat">Thêm</b-button>
				</b-col>
			</b-row>
		</b-modal>
		<b-modal id="setting" hide-footer hide-header >
			<b-row>
				<b-col>
					<h5 class="text-center">Xác nhận xóa</h5>
					<p><b>Nhân viên:</b> {{itemModal.fullname}}</p>
					<p><b>Phòng ban:</b> {{itemModal.departmentName}}</p>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col class="text-center">
					<b-button variant="primary" style="width:100px" @click="confirmDelete">Xác nhận</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('setting')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
		<b-modal id="delete" hide-footer hide-header >
			<b-row>
				<b-col>
					<h5 class="text-center">Xác nhận xóa</h5>
					<p><b>Tên nhân viên:</b> {{itemModal.username}}</p>
					<p><b>Phòng:</b> {{itemModal.username}}</p>
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
		<b-modal id="info" hide-footer hide-header>
			<b-row>
				<b-col><b>Mã nhân viên:</b> {{modalInfo.id}}</b-col>
			</b-row>
			<b-row>
				<b-col><b>Mã nhân viên:</b> {{modalInfo.fullname}}</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col class="text-center">
					<b-button variant="warning" style="width:100%" @click="detail">Chi tiết</b-button>
				</b-col>
				<b-col class="text-center">
					<b-button variant="danger" style="width:100%" @click="chamcong">Chấm công</b-button>
				</b-col>
			</b-row>
		</b-modal>
	</div>
</template>

