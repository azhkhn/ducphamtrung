<style src="./Rewwards.scss" module lang="scss"></style>
<script src="./Rewwards.js"></script>

<template>
	<div>
		<b-row>
			<b-col class="ml-3">
				<!-- <h4>Danh sách phòng ban</h4> -->
			</b-col>
			<b-col class="text-right mr-3">
				<b-button variant="primary" @click="ModalCreat">Thêm mới khen thưởng</b-button>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col>
				<md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card >
					<md-table-toolbar>
						<div class="md-toolbar-section-start">
						<h1 class="md-title">Danh sách</h1>
						</div>

						<md-field md-clearable class="md-toolbar-section-end">
						<md-input placeholder="Tìm kiếm theo tên..." v-model="search" @input="searchOnTable" />
						</md-field>
					</md-table-toolbar>
					<md-table-row slot="md-table-row" slot-scope="{ item }">
						<md-table-cell md-label="Mã khen thưởng" md-sort-by="id" >{{ item.id }}</md-table-cell>
						<md-table-cell md-label="Số quyết định" md-sort-by="name">{{ item.dicisionNo }}</md-table-cell>
						<md-table-cell md-label="Tên khen thưởng" md-sort-by="email">{{ item.title }}</md-table-cell>
						<md-table-cell md-label="Mã phương thức " md-sort-by="email">{{ item.rewardAndDisciplineMethodId }}</md-table-cell>
						<md-table-cell md-label="Tên phương thức" md-sort-by="email">{{ item.rewardAndDisciplineMethodName }}</md-table-cell>
						<md-table-cell md-label="Số tiền khen thưởng" md-sort-by="email">{{ item.amount }}</md-table-cell>
						<md-table-cell md-label="Phần trăm số tiền thưởng" md-sort-by="email">{{ item.percentReward }}</md-table-cell>
						<md-table-cell md-label="Ngày ký" md-sort-by="email">{{ item.signDate }}</md-table-cell>
						<md-table-cell md-label="Người ký" md-sort-by="email">{{ item.signBy }}</md-table-cell>
						<md-table-cell md-label="Mô tả" md-sort-by="email">{{ item.desciption }}</md-table-cell>
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
		<!--  -->
			<b-modal id="Creat" hide-footer hide-header size="lg">
			<b-row>
				<b-col class="text-center"><b>Thêm mới khen thưởng</b></b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Mã khen thưởng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Id" label-text-align="right" >
										<b-form-input id="Id" type="text" name="Id" :formatter="format" v-model.trim="itemAdd.id" ></b-form-input>
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
								<b-col>Số quyết định</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemAdd.dicisionNo" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemAdd.dicisionNo === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Phương thức khen thưởng, kỷ luật</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemAdd.rewardAndDisciplineMethodId" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemAdd.rewardAndDisciplineMethodId === ''">
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
								<b-col>Số tiền thưởng</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemAdd.amount" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemAdd.amount === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>Ngày hiệu lực</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemAdd.effectiveDate" ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="itemAdd.effectiveDate==='' ">
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
										<b-col>Tên khen thưởng</b-col>
									</b-row>
									<b-row>
										<b-col>
											<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
												<b-form-input id="Name" type="text"  v-model.trim="itemAdd.title" name="Name" size="md" maxlength="50"></b-form-input>
											</b-form-group>
											<b-row>
												<b-col>
													<span class="text-danger" v-if="itemAdd.title === ''">
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
								<b-col>Ngày ký</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group label-size="md" style="position: relative;"
												label-for="fromDate"
												label-text-align="left"
										>
										<datepicker  v-model="itemAdd.signDate" name="uniquename" :language="vi" format="dd-MM-yyyy" ></datepicker>
									</b-form-group>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>
									<b-row>
										<b-col>Người ký</b-col>
									</b-row>
									<b-row>
										<b-col>
											<b-form-group label-size="md" style="position: relative;"
														label-for="fromDate"
														label-text-align="left"
														>
												<datepicker  v-model="itemAdd.signBy" name="uniquename" :language="vi" format="dd-MM-yyyy" ></datepicker>
											</b-form-group>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-row>
								<b-col>Mô tả</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-textarea id="textarea1"
														 v-model.trim="itemAdd.desciption"
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
					<b-button variant="primary" style="width:100px" @click="CreatReward">Cập nhật</b-button>
					<b-button variant="danger" style="width:100px" @click="Cancel('Edit')">Hủy bỏ</b-button>
				</b-col>
			</b-row>
		</b-modal>
		<!--  -->
		<b-modal id="Edit" hide-footer hide-header size="lg">
			<b-row>
				<b-col class="text-center"><b>Chỉnh sửa thông tin khen thưởng</b></b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
					<b-row>
						<b-col>
							<b-row>
								<b-col>ID</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Id" label-text-align="right" >
										<b-form-input id="Id" type="text" name="Id" :formatter="format" v-model.trim="itemEdit.id" disabled></b-form-input>
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
								<b-col>dicisionNo</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemEdit.dicisionNo" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemEdit.dicisionNo === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>rewardAndDisciplineMethodId</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemEdit.rewardAndDisciplineMethodId" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemEdit.rewardAndDisciplineMethodId === ''">
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
								<b-col>amount</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
										<b-form-input id="Name" type="text"  v-model.trim="itemEdit.amount" name="Name" size="md" maxlength="50"></b-form-input>
									</b-form-group>
									<b-row>
										<b-col>
											<span class="text-danger" v-if="itemEdit.amount === ''">
												{{$t('ValidateLocation_cb_AvaiSearch')}}
											</span>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>effectiveDate</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-input id="Sdt" type="text" name="Id" :formatter="format" v-model.trim="itemEdit.effectiveDate" ></b-form-input>
									</b-form-group>
									<b-row >
										<b-col >
											<span class="text-danger" v-if="itemEdit.effectiveDate==='' ">
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
										<b-col>title</b-col>
									</b-row>
									<b-row>
										<b-col>
											<b-form-group  class="validateProfile"  label-size="md" label-for="fullNameEdit" label-text-align="right">
												<b-form-input id="Name" type="text"  v-model.trim="itemEdit.title" name="Name" size="md" maxlength="50"></b-form-input>
											</b-form-group>
											<b-row>
												<b-col>
													<span class="text-danger" v-if="itemEdit.title === ''">
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
								<b-col>signDate</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group label-size="md" style="position: relative;"
												label-for="fromDate"
												label-text-align="left"
										>
										<datepicker  v-model="itemEdit.signDate" name="uniquename" :language="vi" format="dd-MM-yyyy" ></datepicker>
									</b-form-group>
								</b-col>
							</b-row>
						</b-col>
						<b-col>
							<b-row>
								<b-col>
									<b-row>
										<b-col>signBy</b-col>
									</b-row>
									<b-row>
										<b-col>
											<b-form-group label-size="md" style="position: relative;"
														label-for="fromDate"
														label-text-align="left"
														>
												<datepicker  v-model="itemEdit.signBy" name="uniquename" :language="vi" format="dd-MM-yyyy" ></datepicker>
											</b-form-group>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-row>
								<b-col>desciption</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-form-group  class="validateProfile"  label-size="md" label-for="Sdt" label-text-align="right" >
										<b-form-textarea id="textarea1"
														 v-model.trim="itemEdit.desciption"
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
		<b-modal id="delete" hide-footer hide-header >
			<b-row>
				<b-col>
					<h5 class="text-center">Xác nhận xóa</h5>
					<p><b>Mã khen thưởng:</b> {{itemModal.id}}</p>
					<p><b>Tên khen thưởng:</b> {{itemModal.title}}</p>
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

