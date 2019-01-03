
<style lang="scss">
@import "./Dashboard.scss";
</style>

<script src="./Dashboard.js">
</script>

<template>
	<div class="displayPage" id="full">
		<md-app>
			<md-app-toolbar class="md-primary" md-elevation="0" v-bind:style="{'background-color': them}">
				<b-row style="width:100%">
					<b-col>
						<md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible" style="margin-top:10px;">
						<icon class="" name="bars" scale="1" style="color:#fff"></icon>
						</md-button>
						<span class="md-title" style="line-height:60px" v-if="title==='HRRecords'">Hồ sơ nhân sự</span>
					</b-col>
					<b-col>
						<b-navbar toggleable type="dark" style="float:right">
							<!-- <b-navbar-nav class="mr-5 mt-2">
								<b-button variant="warning" style="color:#fff" @click="chamcong">Chấm công</b-button>
							</b-navbar-nav> -->
							<b-navbar-nav>
								<icon name="user-circle" class="mt-3" style="color:#fff" scale="1.3"></icon>
								<b-nav-item-dropdown :text="user" right style="" class="itemheader text-dark mt-2">
									<b-dropdown-item class="text-dark" href="#" @click="handleFullScreen"><img src="~icons/Credit-blue.png" width="20px" height="20px" /> {{$t('PROFILE')}}</b-dropdown-item>
									<b-dropdown-item class="text-dark" href="#" @click="modalChangePassword($event)"><img src="~icons/Key-blue.png" width="20px" height="20px" /> {{$t('CHANGE_PASSWORD')}}</b-dropdown-item>
									<b-dropdown-item class="text-dark" href="#" @click="signOut()"><img src="~icons/Logout-blue.png" width="20px" height="20px" /> {{$t('LOGOUT')}}</b-dropdown-item>
								</b-nav-item-dropdown>
							</b-navbar-nav>
						</b-navbar>
					</b-col>
				</b-row>
			</md-app-toolbar>
			<md-app-drawer :md-active.sync="menuVisible">
				<md-toolbar class="md-transparent" md-elevation="0">
				<span>Menu</span>
				<div class="md-toolbar-section-end">
					<md-button class="md-icon-button md-dense" @click="toggleMenu">
						<img src="~icons/Arrow Left-blue.png" width="30px" height="30px" />
					</md-button>
				</div>
				</md-toolbar>
				<md-list :md-expand-single="true">
				<md-list-item  md-expand @click="menuVisible=true">
					<img src="~icons/Pending-blue.png" width="30px" height="30px" />
					<span class="md-list-item-text ml-2">Phòng ban</span>
					<md-list slot="md-expand" >
						<md-list-item class="md-inset" @click="currentviewPage('ListDepartments')">
							<b-row>
								<b-col md="2"><icon class="" name="user" scale="1" style="color:#448aff"></icon></b-col>
								<b-col>Danh sách phòng ban</b-col>
							</b-row>
						</md-list-item>

					</md-list>
				</md-list-item>
				<md-list-item md-expand @click="menuVisible=true">
					<img src="~icons/Room Type-blue.png" width="30px" height="30px" />
					<span class="md-list-item-text ml-2">Hồ sơ</span>
					<md-list slot="md-expand">
						<md-list-item class="md-inset" @click="currentviewPage('HRRecords')">
							<b-row>
								<b-col md="2"><icon class="" name="user" scale="1" style="color:#448aff"></icon></b-col>
								<b-col> Hồ sơ nhân sự</b-col>
							</b-row>
						</md-list-item>
						<md-list-item class="md-inset" @click="currentviewPage('Member')" v-if="this.$store.getters['user/roles'] === '1'">
							<b-row>
								<b-col md="2"><icon class="" name="address-book" scale="1" style="color:#448aff"></icon></b-col>
								<b-col>Người dùng</b-col>
							</b-row>
						</md-list-item>
						<md-list-item class="md-inset" @click="currentviewPage('Contracts')" v-if="this.$store.getters['user/roles'] === '1'">
							<b-row>
								<b-col md="2"><icon class="" name="book" scale="1" style="color:#448aff"></icon></b-col>
								<b-col>Hợp đồng</b-col>
							</b-row>
						</md-list-item>
					</md-list>
				</md-list-item>
				<md-list-item md-expand @click="menuVisible=true">
					<img src="~icons/Pending-blue.png" width="30px" height="30px" />
					<span class="md-list-item-text ml-2">Quản lý khen thưởng</span>
					<md-list slot="md-expand">
						<md-list-item class="md-inset" @click="currentviewPage('Rewwards')" >
							<b-row>
								<b-col md="1"><icon class="" name="user" scale="1" style="color:#448aff"></icon></b-col>
								<b-col>Loại khen thưởng</b-col>
							</b-row>
						</md-list-item>
						<!-- <md-list-item class="md-inset" @click="currentviewPage('Danhsachkt')" >
							<b-row>
								<b-col md="1"><icon class="" name="user" scale="1" style="color:#448aff"></icon></b-col>
								<b-col> Danh sách khen thưởng</b-col>
							</b-row>
						</md-list-item> -->
					</md-list>
				</md-list-item>
				<md-list-item md-expand @click="menuVisible=true">
					<img src="~icons/Pending-blue.png" width="30px" height="30px" />
					<span class="md-list-item-text ml-2">Quản lý lương</span>
					<md-list slot="md-expand">
						<md-list-item class="md-inset" @click="currentviewPage('SalaryRecords')">
							<b-row>
								<b-col md="2"><icon class="" name="user" scale="1" style="color:#448aff"></icon></b-col>
								<b-col> Danh sách lương</b-col>
							</b-row>
						</md-list-item>
					</md-list>
				</md-list-item>
				<md-list-item md-expand @click="menuVisible=true">
					<img src="~icons/Setting-blue.png" width="30px" height="30px" />
					<span class="md-list-item-text ml-2">Thems</span>
					<md-list slot="md-expand">
						<md-list-item class="md-inset" @click="thems('#3f51b5')">
							<b-row>
								<b-col> <span class="color-option indigo"></span></b-col>
							</b-row>
						</md-list-item>
						<md-list-item class="md-inset" @click="thems('#4caf50')">
							<b-row>
								<b-col><span class="color-option green"></span></b-col>
							</b-row>
						</md-list-item>
						<md-list-item class="md-inset" @click="thems('#2196f3')">
							<b-row>
								<b-col><span class="color-option primary"></span></b-col>
							</b-row>
						</md-list-item>
					</md-list>
				</md-list-item>
				</md-list>
			</md-app-drawer>
			<md-app-content>
				<keep-alive>
					<component  :is="currentView"></component>
				</keep-alive>
			</md-app-content>
		</md-app>
		<b-modal size="sm" id="modalChangePassword" :title="$t('CHANGE_PASSWORD')" hide-header hide-footer @hidden="onHidden">
			<b-row>
				<b-col>
					<b-row>
						<b-col>{{$t('Current_Password')}}</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-form-group class="validatePageHeader"  label-size="md"  label-for="emailProfile" label-text-align="right">
								<b-form-input id="currentPass" type="password" v-model="itemss.currentPass" name="currPassword" size="md">
								</b-form-input>
							</b-form-group>
							<b-row>
								<b-col class="text-left">
									<span class="text-danger"  v-if="errorChangePassword === false && itemss.currentPass === ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}
									</span>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<br>
					<b-row>
						<b-col>{{$t('New_Password')}}</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-form-group class="validatePageHeader" label-size="md" label-for="newPass" label-text-align="right">
								<b-form-input id="newPass" type="password" v-model="itemss.newPass" name="newPass" size="md">
							</b-form-input>
							</b-form-group>
							<b-row>
								<b-col class="text-left">
									<span class="text-danger" v-if="errorChangePassword === false && itemss.newPass.length < 8">
										{{ $t('NEWPASS_ERROR_REQUIRED') }}
									</span>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<br>
					<b-row>
						<b-col>{{$t('CfNew_Password')}}</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-form-group class="validatePageHeader" label-size="md"  label-for="cfNewPass" label-text-align="right">
								<b-form-input id="cfNewPass" type="password" v-model="itemss.cfnewPass" name="cfNewPass" size="md" >
								</b-form-input>
							</b-form-group>
							<b-row>
								<b-col class="text-left">
									<span class="text-danger"  v-if="errorChangePassword === false && itemss.cfnewPass === ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}
									</span>
									<span class="text-danger" v-if="errorCfPassword === false && errorChangePassword === true">
										{{ $t('CFNEWPASS_ERROR_REQUIRED') }}
								</span>
									</b-col>
							</b-row>
						</b-col>
					</b-row>
					<b-row>
						<b-col md="4">
								<b-button class="btn-password" variant="link" size="md" @click="hideModal" @click.stop="hideModal('editProfile')" style="width: 95px;height: 37px;border-radius: 5px;border: solid 1px #258fe0;">{{$t('Cancel')}}</b-button>
						</b-col>
						<b-col >
							<b-button class="btn-password" variant="primary" size="md" @click.stop="cfchangePassword(itemss)" style="width: 100%;height: 37px;border-radius: 5px;border: solid 1px #258fe0;"> {{$t('Save')}} </b-button>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
		</b-modal>
	</div>
</template>

