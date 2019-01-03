<style src="./Contracts.scss" module lang="scss"></style>
<script src="./Contracts.js"></script>

<template>
	<div>
		<b-row>
			<b-col class="ml-3">
				<!-- <h4>Danh sách phòng ban</h4> -->
			</b-col>
			<b-col class="text-right mr-3">
				<b-button variant="primary" @click="ModalCreat">Thêm mới Hợp đồng</b-button>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col>
				<md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>
					<md-table-toolbar>
						<div class="md-toolbar-section-start">
						<h1 class="md-title">Danh sách hợp đồng</h1>
						</div>
						<md-field md-clearable class="md-toolbar-section-end">
						<md-input placeholder="Tìm kiếm theo tên Hợp đồng..." v-model="search" @input="searchOnTable" />
						</md-field>
					</md-table-toolbar>
					<md-table-row slot="md-table-row" slot-scope="{ item }">
						<md-table-cell md-label="Mã hợp đồng" md-sort-by="id" >{{ item.id }}</md-table-cell>
						<md-table-cell md-label="Tên" md-sort-by="name">{{ item.name }}</md-table-cell>
						<md-table-cell md-label="Mã loại họp đồng" md-sort-by="contractTypeId">{{ item.contractTypeId }}</md-table-cell>
						<md-table-cell md-label="tên loại hợp đồng" md-sort-by="contractTypeName">{{ item.contractTypeName }}</md-table-cell>
						<md-table-cell md-label="thời gian hiệu lưc" md-sort-by="time">{{ item.time }}</md-table-cell>
						<md-table-cell md-label="Hệ số lương" md-sort-by="salaryFactor">{{ item.salaryFactor }}</md-table-cell>
						<md-table-cell md-label="Trạng thái" md-sort-by="active" >
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
				<b-col class="text-center"><b>Thêm mới hợp đồng</b></b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Mã hợp đồng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Id" label-text-align="right" >
										<b-form-input id="Id" type="text" name="Id" :formatter="format" v-model.trim="itemAdd.id"  ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="itemAdd.id === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Tên hợp đồng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemAdd.name" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemAdd.name === ''">
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
								<b-col>Mã loại hợp đồng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemAdd.contractTypeId" ></b-form-input>
									</b-form-group>
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
													<b-form-checkbox v-model="itemAdd.active" id="Status" name="Status"  value="true" unchecked-value="false"></b-form-checkbox>
												</b-form-group>
										</b-col>
										<b-col >{{$t('Status_row_AffiliateNetwork')}}</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Thời gian áp dụng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemAdd.time"></b-form-input>
									</b-form-group>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Hệ số lương</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemAdd.salaryFactor"></b-form-input>
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
					<b-button variant="primary" style="width:100px" @click="CreatContract">Cập nhật</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('Edit')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
		<b-modal id="Edit" hide-footer hide-header >
			<b-row>
				<b-col class="text-center"><b>Chỉnh sửa thông tin hợp đồng</b></b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Mã hợp đồng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Id" label-text-align="right" >
										<b-form-input id="Id" type="text" name="Id" :formatter="format" v-model.trim="itemEdit.id" disabled ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="itemEdit.id === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Tên hợp đồng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemEdit.name" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemEdit.name === ''">
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
								<b-col>Mã loại hợp đồng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemEdit.contractTypeId" disabled></b-form-input>
									</b-form-group>
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
													<b-form-checkbox v-model="itemEdit.active" id="Status" name="Status"  value="true" unchecked-value="false"></b-form-checkbox>
												</b-form-group>
										</b-col>
										<b-col >{{$t('Status_row_AffiliateNetwork')}}</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Thời gian áp dụng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemEdit.time"></b-form-input>
									</b-form-group>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Hệ số lương</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemEdit.salaryFactor"></b-form-input>
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
					<b-button variant="primary" style="width:100px" @click="EditContract">Cập nhật</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('Edit')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
		<b-modal id="Delete" hide-footer hide-header >
			<b-row>
				<b-col>
					<h5 class="text-center">Xác nhận xóa</h5>
					<p><b>Mã hợp đồng:</b> {{itemModal.id}}</p>
					<p><b>Tên:</b> {{itemModal.name}}</p>
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

