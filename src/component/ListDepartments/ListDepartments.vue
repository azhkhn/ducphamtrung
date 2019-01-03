<style src="./ListDepartments.scss" module lang="scss"></style>
<script src="./ListDepartments.js"></script>

<template>
	<div>
		<b-row>
			<b-col class="ml-3">
				<!-- <h4>Danh sách phòng ban</h4> -->
			</b-col>
			<b-col class="text-right mr-3">
				<b-button variant="primary" @click="ModalCreat">Thêm mới phòng ban</b-button>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col>
				<md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
					<md-table-toolbar>
						<div class="md-toolbar-section-start">
						<h1 class="md-title">Danh sách phòng ban</h1>
						</div>

						<md-field md-clearable class="md-toolbar-section-end">
						<md-input placeholder="Tìm kiếm theo tên phòng ban..." v-model="search" @input="searchOnTable" />
						</md-field>
					</md-table-toolbar>

					<!-- <md-table-empty-state
						md-label="No users found"
						:md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
						<md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
					</md-table-empty-state> -->

					<md-table-row slot="md-table-row" slot-scope="{ item }">
						<md-table-cell md-label="Mã phòng" md-sort-by="id" >{{ item.id }}</md-table-cell>
						<md-table-cell md-label="Tên" md-sort-by="name">{{ item.name }}</md-table-cell>
						<md-table-cell md-label="Điện thoại" md-sort-by="email">{{ item.phoneNumber }}</md-table-cell>
						<md-table-cell md-label="Trạng thái" md-sort-by="gender" >
							<md-switch v-model="item.active" class="md-primary" @change="showModalStatus(item)" disabled></md-switch>
						</md-table-cell>
						<md-table-cell md-label="Hành động" md-sort-by="title">
							<div style="width:110px">
								<span><b-button variant="link" style="width:50px" @click="edit(item)"><img src="~icons/edit-blue.png" style="width:23px;height:23px"/></b-button></span>
								<span>
									<b-button variant="link" style="width:50px" @click="modalSetting(item)">
										<img src="~icons/delete-red.png" style="width:23px;height:23px"/>
									</b-button>
								</span>
							</div>
						</md-table-cell>
					</md-table-row>
				</md-table>
			</b-col>
		</b-row>
		<b-modal id="Creat" hide-footer hide-header >
			<b-row>
				<b-col class="text-center"><b>Thêm mới phòng ban</b></b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Mã Phòng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Id" label-text-align="right" >
										<b-form-input id="Id" type="text" name="Id" :formatter="format" v-model.trim="item.Id" ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="item.Id === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Tên phòng ban</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="item.Name" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="item.Name === ''">
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
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="item.Sdt" ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="phonenumber(item.Sdt)===false ">
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
							</b-row>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col class="text-center">
					<b-button variant="primary" style="width:100px" @click="creat">Thêm mới</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('Creat')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
		<b-modal id="Edit" hide-footer hide-header >
			<b-row>
				<b-col class="text-center"><b>Chỉnh sửa thông tin phòng ban</b></b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Mã Phòng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Id" label-text-align="right" >
										<b-form-input id="Id" type="text" name="Id" :formatter="format" v-model.trim="itemEdit.Id" disabled ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="itemEdit.Id === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Tên phòng ban</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemEdit.Name" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemEdit.Name === ''">
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
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemEdit.Sdt" ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="phonenumber(itemEdit.Sdt)===false ">
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
									<br>
									<b-row style="padding-left:10px">
										<b-col md="1">
												<b-form-group class="validateProfile"  label-size="md"   label-text-align="right">
													<b-form-checkbox v-model="itemEdit.status" id="Status" name="Status"  value="true" unchecked-value="false"></b-form-checkbox>
												</b-form-group>
										</b-col>
										<b-col >{{$t('Status_row_AffiliateNetwork')}}</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col class="text-center">
					<b-button variant="primary" style="width:100px" @click="EditDepartment">Cập nhật</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('Edit')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
		<b-modal id="Delete" hide-footer hide-header >
			<b-row>
				<b-col>
					<h5 class="text-center">Xác nhận xóa</h5>
					<p><b>Mã phòng:</b> {{itemModal.id}}</p>
					<p><b>Phòng ban:</b> {{itemModal.name}}</p>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col class="text-center">
					<b-button variant="primary" style="width:100px" @click="Delete(itemModal)">Xác nhận</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('Delete')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
	</div>
</template>

