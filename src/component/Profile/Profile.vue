<style lang="scss">
@import './Profile.scss';</style>
<script src="./Profile.js"></script>

<template>
	<div id="profile">
		<div style="text-align: center;" >
				<Spinner name="three-bounce"  v-if="flag===true" color="#e86e53"/>
		</div>
		<!-- <b-card > -->
		<b-row class="ml-3 mr-3">
			<b-col md="3"><p class="titleInfomation">{{$t('PERSONAL_INFORMATION')}}</p></b-col>
			<b-col class="ml-3"><p class="titleInfomation">{{$t('AGENCY_INFORMATION')}}</p></b-col>
		</b-row>
		<br>
		<b-row class="ml-3 mr-3">
			<b-col md="3" class="infoPerson">
				<br>
				<b-row>
					<b-col md="7"  class="text-right">
						<div>
							<icon name="user-circle" style="color:gray" scale="3"></icon>
						</div>
					</b-col>
					<b-col class="mt-2">
						<b-btn variant="link" @click="editDirectorAgent" style="text-align:left;color:#000">
							<img src="~icons/edit-blue.png" style="width:23px;height:23px"/> Edit
						</b-btn>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col class="titleInfo ml-3 mr-3">{{$t('FULL_NAME_PROFILE')}}:</b-col>
				</b-row>
				<b-row>
					<b-col class="colInfo ml-3 mr-3">{{profile.useragentResponse.fullname}}</b-col>
				</b-row>
				<b-row>
					<b-col  class="titleInfo ml-3 mr-3">{{$t('DESIGNATION_PROFILE')}}:</b-col>
				</b-row>
				<b-row>
					<b-col class="colInfo ml-3 mr-3">{{profile.useragentResponse.designation}}</b-col>
				</b-row>
				<b-row>
					<b-col  class="titleInfo ml-3 mr-3">{{$t('MOBILE_PROFILE')}}:</b-col>
				</b-row>
				<b-row>
					<b-col class="colInfo ml-3 mr-3">{{profile.useragentResponse.mobile}}</b-col>
				</b-row>
				<b-row>
					<b-col  class="titleInfo ml-3 mr-3">{{$t('Email')}}:</b-col>
				</b-row>
				<b-row>
					<b-col class="colInfo ml-3 mr-3">{{profile.useragentResponse.email}}</b-col>
				</b-row>
				<b-row>
					<b-col  class="titleInfo ml-3 mr-3">{{$t('ADDRESS_PROFILE')}}:</b-col>
				</b-row>
				<b-row>
					<b-col class="colInfo ml-3 mr-3">{{profile.useragentResponse.address}}</b-col>
				</b-row>
			</b-col>
			<b-col class="agencyInfo ml-3">
				<br>
				<b-row class="mb-4">
					<b-col class="ml-3 pt-2"><p class="agentId" >{{$t('AGENT_CODE_PROFILE')}}: {{profile.agentId}}</p></b-col>
					<b-col class="text-right pt-2"><b-btn variant="link" v-if="roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN'"  @click.stop="detail" style="color:#000"><img src="~icons/edit-blue.png" style="width:23px;height:23px;"/> Edit</b-btn></b-col>
				</b-row>
				<b-row style="margin-top:32px">
					<b-col class="ml-3 mr-3">
						<b-row>
							 <b-col><span class="lablecolor" >{{$t('TRAVEL_AGENCY_NAME_PROFILE')}}</span></b-col>
						</b-row>
						<b-row>
							<b-col class="colInfo">
								<p v-for="(item,index) in profile.modelI18nProfiles" :key="index" v-if="item.langCode === $store.getters.currentLanguage.code">
									{{item.hotelName}}
								</p>
							</b-col>
						</b-row>
						<b-row>
							<b-col><span class="lablecolor">{{$t('TELEPHONE_PROFILE')}}:</span></b-col>
						</b-row>
						<b-row>
							<b-col class="colInfo">{{profile.telephoneNo}}</b-col>
						</b-row>
						<b-row>
							<b-col><span  class="lablecolor">{{$t('Email')}}</span></b-col>
						</b-row>
						<b-row>
							<b-col class="colInfo">{{profile.email}}</b-col>
						</b-row>
						<b-row>
							 <b-col ><span  class="lablecolor">{{$t('WEBSITE_PROFILE')}}:</span></b-col>
						</b-row>
						<b-row>
							<b-col class="colInfo">{{profile.website}}</b-col>
						</b-row>
						<b-row>
							<b-col><span  class="lablecolor">{{$t('MOBILE_PROFILE')}}:</span></b-col>
						</b-row>
						<b-row>
							<b-col class="colInfo">{{profile.mobileno}}</b-col>
						</b-row>
					</b-col>
					<b-col class="ml-3 mr-3">
						<b-row>
							 <b-col ><span class="lablecolor">{{$t('COUNTRY_PROFILE')}}:</span></b-col>
						</b-row>
						<b-row>
							<b-col class="colInfo" v-for="(item,index) in profile.modelI18nProfiles" :key="index" v-if="item.langCode === $store.getters.currentLanguage.code">
								{{item.country}}
	  						</b-col>
						</b-row>
						<b-row>
							<b-col><span class="lablecolor">{{$t('CITY_PROFILE')}}:</span></b-col>
							<b-col><span class="lablecolor">{{$t('DISTRICT_PROFILE')}}:</span></b-col>
						</b-row>
						<b-row>
							<b-col class="colInfo mr-3" v-for="(item,index) in profile.modelI18nProfiles" :key="index" v-if="item.langCode === $store.getters.currentLanguage.code">
		  						{{item.city}}
							</b-col>
							<b-col class="colInfo ml-3" v-for="(item,index) in profile.modelI18nProfiles " :key="index" v-if="item.langCode === $store.getters.currentLanguage.code">
								 {{item.location}}
							</b-col>
						</b-row>
						<b-row>
							<b-col><span  class="lablecolor">{{$t('ADDRESS_PROFILE')}}:</span></b-col>
						</b-row>
						<b-row>
							<b-col class="colInfo">
								<p v-for="(item,index) in profile.modelI18nProfiles " :key="index" v-if="item.langCode === $store.getters.currentLanguage.code">
								{{item.address}}
								</p>
							</b-col>
						</b-row>
						<b-row>
							<b-col><span class="lablecolor">{{$t('ZIP_CODE_PROFILE')}}:</span></b-col>
							<b-col><span class="lablecolor">{{$t('PREFERED_CURRENCY_PROFILE')}}:</span></b-col>
						</b-row>
						<b-row>
							<b-col class="colInfo mr-3">{{profile.zipcode}}</b-col>
							<b-col class="colInfo ml-3">{{profile.currency}}</b-col>
						</b-row>
						<b-row>
							<b-col><span class="lablecolor">{{$t('SKYPE_ID_PROFILE')}}:</span></b-col>
						</b-row>
						<b-row>
							<b-col class="colInfo">{{profile.skype}}</b-col>
						</b-row>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<br>
		<b-row class="ml-3 mr-3">
			<b-col class="mt-3">
				<span style="font-size:14px"><b>{{$t('USER_MANAGEMENT_PROFILE')}}</b></span>
			</b-col>
			<b-col style="padding-right:0px">
				<div class="text-right" v-if="roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN'">
				<b-button variant="primary" size="lg" @click.stop="addUser">{{$t('ADD_USER_PROFILE')}}</b-button>
				</div>
			</b-col>
		</b-row>
		<br>
		<b-row class="mb-5 ml-3 mr-3">
			<b-col style="padding:0">
			<b-table head-variant="light" outlined :items="getLishUserAgent" :fields="fields" style="text-align:center; background-color:#fff; box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);">
				<template slot="role" slot-scope="row" >
					<div v-if="row.item.role == 'ROLE_TRAVEL_AGENT_ADMIN'">
						Admin
					</div>
					<div v-else>
						User
					</div>
				</template>
				<template slot="status" slot-scope="row" >
					<switches v-model="row.item.status" @click.native="showModalStatus(row.item.username, row.value)" theme="bulma" color="blue" v-if="row.item.username !== usernameAgent && row.value === true" ></switches>
					<switches v-model="row.item.status" @click.native="showModalStatus(row.item.username, row.value)" theme="bulma"  v-if="row.item.username !== usernameAgent && row.value === false" ></switches>
				</template>
				<template slot="action" slot-scope="row">
					<b-row>
						<b-col style="padding-left:0px;padding-right:0px">
							<b-button variant="link" size="sm"  @click.stop="editUser(row.item, $event.target)" style="border:0px">
							<img src="~icons/edit-blue.png" style="width:23px;height:23px"/>
							</b-button>
						</b-col>
						<b-col  style="padding-right:5px;padding-left:0px">
							<b-button :disabled="row.item.disabled" v-if="row.item.username !== usernameAgent"  variant="link" size="sm"  @click.stop="deleteUser(row.item, $event.target)"  style="border:0px">
							<img src="~icons/delete-red.png" style="width:23px;height:23px"/>
							</b-button>
						</b-col>
					</b-row>
				</template>
			</b-table>
			</b-col>
		</b-row>
	<!-- edit profile modal -->
    <b-modal hide-footer hide-header id="editProfile" >
      <h4>{{$t('DIRECTOR_PROFILE')}}:  {{profile.useragentResponse.fullname}}</h4>
	  <hr>
	  <b-form  v-on:keyup.enter= "confirmDirectorAgent(item2)">
		<b-row >
        <b-col md="10">
			<b-form-group horizontal class="validateProfile" :label-cols="5" label-size="md"  :label="$t('Email')"  label-for="emailProfile" label-text-align="right">
				<b-form-input id="emailProfile" type="text" v-model="item2.email" name="email" size="md">
				</b-form-input>
			</b-form-group>
		<b-row>
			<b-col md="5"></b-col>
			<b-col md="6" class="text-left">
			<span class="text-danger " v-if="errorEditAgent === false && item2.email === ''">
 				{{ $t('REQUIRED_PROFILE') }}
			</span>
			<span class="text-danger" v-if="validateEmail(item2.email) === false && item2.email !== ''">
				{{$t('EMAILADDRESS_ERROR_REQUIRED')}}
			</span>
			</b-col>
		</b-row>
        </b-col>
      </b-row>
	<b-row>
  		<b-col md="10" >
        <b-form-group horizontal class="validateProfile" :label-cols="5" label-size="md" :label="$t('FULL_NAME_PROFILE')" label-for="fullName" label-text-align="right">
            <b-form-input id="fullName"  type="text" name="fullName" v-model="item2.fullname" maxlength="50">
			</b-form-input>
        </b-form-group>
		<b-row>
			<b-col md="5"></b-col>
			<b-col md="6" class="text-left">
			<span class="text-danger " v-if="errorEditAgent === false && item2.fullname === ''">
 				{{ $t('REQUIRED_PROFILE') }}
			</span>
			</b-col>
		</b-row>
  		</b-col>
	</b-row>
	<b-row>
  		<b-col md="10" >
        <b-form-group horizontal :label-cols="5" label-size="md" :label="$t('MOBILE_PROFILE')" label-for="mobileProfile" label-text-align="right" >
        	<b-form-input id="mobileProfile" type="text" name="mobile" maxlength="13" v-model="item2.mobile"></b-form-input>
        </b-form-group>
	  </b-col>
	</b-row>
	<b-row>
			<b-col md="4"></b-col>
			<b-col md="7" class="text-left">
				<span class="text-danger" v-if="checkTelephone===false">
                      {{$t('ERROR_PHONE')}}
               	</span>
			</b-col>
	</b-row>
	<b-row>
		<b-col md="10" >
			<b-form-group horizontal class="validateProfile" :label-cols="5" label-size="md" :label="$t('DESIGNATION_PROFILE')"	label-for="designation" label-text-align="right">
				<b-form-input id="designation" type="text" name="designation"  v-model.trim="item2.designation"></b-form-input>
			</b-form-group>
		<b-row>
			<b-col md="5"></b-col>
			<b-col md="6" class="text-left">
			<span class="text-danger " v-if="errorEditAgent === false && item2.designation === ''">
 				{{ $t('REQUIRED_PROFILE') }}
			</span>
			</b-col>
		</b-row>
		</b-col>
	</b-row>
	  </b-form>
		<br>
	   <div class="text-center">
		    <b-button variant="outline-primary" @click="hideModal" size="md" @click.stop="hideModal('editProfile')"> {{$t('Cancel')}} </b-button>
     		<b-button variant="primary" class="btn-yellow" size="md" @click.stop="confirmDirectorAgent(item2)" style="width:100px">{{$t('Confirm_col_AffiliateNetwork')}} </b-button>
	   </div>
</b-modal>
	<!-- profile detail -->
	<b-modal size="lg" hide-footer hide-header id="profileDetail">
      <h4>{{$t('EDIT_PROFILE_DETAILS_PROFILE')}}: </h4>
	  <hr>
	  <b-tabs>
		  <br>
		  <b-tab :title="$t('vi')">
		<!-- <b-form  v-on:keyup.enter= "editProfileDetail(itemDetail)"> -->
			<b-row >
				<b-col md="6">
				<b-form-group horizontal :label-cols="5" label-size="md" :label= "$t('AGENT_CODE_PROFILE')"  label-for="agentCode"  label-text-align="right">
					<b-form-input id="agentCode" type="text" disabled  v-model="itemDetail.agentId" name="agentCode" size="md"></b-form-input>
				</b-form-group>
				</b-col>
				<b-col md="6" >
						<b-form-group horizontal
							:label-cols="5"
							label-size="md"
							:label="$t('COUNTRY_PROFILE')"
							label-for="country"
							label-text-align="right">
							<b-form-select id="country"
								type="text"
								:options="lstCountry"
								name="country"
								value-field="id"
								text-field="title"
								size="md"
								v-model="itemDetail.countryId" ></b-form-select>
							<span class="text-danger" v-if="errorEditDetail===false && itemDetail.country === 0">
								{{$t('ValidateLocation_cb_AvaiSearch')}}
							</span>
						</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('TRAVEL_AGENCY_NAME_PROFILE')"
								label-for="agencyName"
								label-text-align="right">
									<b-form-input id="agencyName"
									type="text" name="agencyName"
									v-model="itemDetail.agencyName"
								></b-form-input>
								</b-form-group>
							<b-row>
								<b-col md="5"></b-col>
								<b-col md="7" class="text-left">
									<span class="text-danger " v-if="errorEditDetail===false && itemDetail.agencyName === ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}</span>
								</b-col>
							</b-row>
				</b-col>
				<b-col md="6">
						<b-form-group horizontal :label-cols="5"
								label-size="md"
								:label="$t('CITY_PROFILE')"
								label-for="city"
								label-text-align="right">
										<b-form-select  id="city"
									type="text"
									:options="filterbyCountry"
									name="city"
									value-field="id"
									text-field="title"
										size="md"
										v-model.trim="itemDetail.cityId" ></b-form-select>
										<span class="text-danger" v-if="errorEditDetail===false && itemDetail.city === 0">
									{{$t('ValidateLocation_cb_AvaiSearch')}}
								</span>
								</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('Email')"
								label-for="emailDetail"
								label-text-align="right">
									<b-form-input id="emailDetail"
									type="text" name="email"
									v-model="itemDetail.email"
								></b-form-input>
								</b-form-group>
							<b-row>
								<b-col md="5"></b-col>
								<b-col md="7" class="text-left">
									<span class="text-danger " v-if="errorEditDetail===false && itemDetail.email === ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}
									</span>
									<span class="text-danger" v-if="validateEmail(this.itemDetail.email) === false && itemDetail.email !== ''">
										{{$t('EMAILADDRESS_ERROR_REQUIRED')}}
									</span>
								</b-col>
							</b-row>
				</b-col>
				<b-col md="6" >
						<b-form-group horizontal :label-cols="5"
								label-size="md"
								:label="$t('DISTRICT_PROFILE')"
								label-for="city"
								label-text-align="right">
										<b-form-select  id="city"
									type="text"
									:options="filterbyCity"
									name="city"
									value-field="id"
									text-field="title"
										size="md"
										v-model.trim="itemDetail.locId" ></b-form-select>
										<span class="text-danger" v-if="errorEditDetail===false && itemDetail.city === 0">
									{{$t('ValidateLocation_cb_AvaiSearch')}}
								</span>
								</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('MOBILE_PROFILE')"
								label-for="mobile"
								label-text-align="right">
									<b-form-input id="mobile"
									type="text" name="mobile"
									v-model="itemDetail.mobileno"
								></b-form-input>
								</b-form-group>
									<b-row>
											<b-col md="5"></b-col>
											<b-col md="7" class="text-left">
												<span class="text-danger" v-if="checkTelephone===false">
													{{$t('ERROR_PHONE')}}
												</span>
											</b-col>
									</b-row>
				</b-col>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('ADDRESS_PROFILE')"
								label-for="address"
								label-text-align="right">
									<b-form-input id="address"
									type="text" name="address"
									v-model="itemDetail.addres"
								></b-form-input>
								</b-form-group>
							<b-row>
								<b-col md="5"></b-col>
								<b-col md="7" class="text-left">
									<span class="text-danger " v-if="errorEditDetail===false && itemDetail.addres === ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}</span>
								</b-col>
							</b-row>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" >
						<b-form-group horizontal
								:label-cols="5"
								label-size="md"
								:label="$t('WEBSITE_PROFILE')"
								label-for="website"
								label-text-align="right">
									<b-form-input id="website"
									type="text" name="website"
									v-model="itemDetail.website"
								></b-form-input>
								</b-form-group>

				</b-col>
				<b-col md="6" >
						<b-form-group horizontal
								:label-cols="5"
								label-size="md"
								:label="$t('PREFERED_CURRENCY_PROFILE')"
								label-for="currency"
								label-text-align="right">
									<b-form-select  id="currency"
									type="text"
									:options="lstCurrency"
									name="currency"
									value-field="code"
									text-field="code"
										size="md"
										v-model="itemDetail.currency" ></b-form-select>
								<!-- <span class="text-danger" v-if="errors.has('city')">
									{{ errors.first('city') }}
								</span> -->
								<span class="text-danger" v-if="errorEditDetail===false && itemDetail.currency === ''">
									{{$t('ValidateLocation_cb_AvaiSearch')}}
								</span>
								</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('ZIP_CODE_PROFILE')"
								label-for="zipcode"
								label-text-align="right">
									<b-form-input id="zipcode"
									type="text" name="zipcode"
									v-model="itemDetail.zipcode"
								></b-form-input>
								</b-form-group>
							<b-row>
								<b-col md="5"></b-col>
								<b-col md="7" class="text-left">
									<span class="text-danger " v-if="errorEditDetail===false && itemDetail.zipcode == ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}</span>
								</b-col>
							</b-row>
				</b-col>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('TELEPHONE_PROFILE')"
								label-for="telephone"
								label-text-align="right">
									<b-form-input id="telephone"
									type="text" name="telephone"
									v-model="itemDetail.telephoneNo"
								></b-form-input>
								</b-form-group>
							<b-row>
								<b-col md="5"></b-col>
								<b-col md="7" class="text-left">
									<span class="text-danger" v-if="checkTelephone===false">
										{{$t('ERROR_PHONE')}}
									</span>
								</b-col>
							</b-row>
				</b-col>
			</b-row>
			<!-- them  -->
			<b-row>
				<b-col md="6" >
				</b-col>
				<b-col md="6" >
						<b-form-group horizontal
								:label-cols="5"
								label-size="md"
								:label="$t('SKYPE_ID_PROFILE')"
								label-for="skype"
								label-text-align="right">
									<b-form-input id="skype"
									type="text" name="skype"
									v-model="itemDetail.skype"
								></b-form-input>
								</b-form-group>
				</b-col>
			</b-row>
	   <!-- </b-form> -->
	   	</b-tab>
		   <b-tab :title="$t('en')">
			   <b-row >
				<b-col md="6">
				<b-form-group horizontal :label-cols="5" label-size="md" :label= "$t('AGENT_CODE_PROFILE')"  label-for="agentCode"  label-text-align="right">
					<b-form-input id="agentCode" type="text" disabled  v-model="itemDetail.agentId" name="agentCode" size="md"></b-form-input>
				</b-form-group>
				</b-col>
				<b-col md="6" >
						<b-form-group horizontal
							:label-cols="5"
							label-size="md"
							:label="$t('COUNTRY_PROFILE')"
							label-for="country"
							label-text-align="right">
							<b-form-select id="country"
								type="text"
								:options="lstCountryEN"
								name="country"
								value-field="id"
								text-field="title"
								size="md"
								v-model="itemDetail.countryId" ></b-form-select>
							<span class="text-danger" v-if="errorEditDetail===false && itemDetail.country === 0">
								{{$t('ValidateLocation_cb_AvaiSearch')}}
							</span>
						</b-form-group>
				</b-col>
			</b-row>
			<!-- note 1 -->
			<b-row>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('TRAVEL_AGENCY_NAME_PROFILE')"
								label-for="agencyNameEN"
								label-text-align="right">
									<b-form-input id="agencyNameEN"
									type="text" name="agencyNameEN"
									v-model="itemDetail.agencyNameEN"
								></b-form-input>
								</b-form-group>
							<b-row>
								<b-col md="5"></b-col>
								<b-col md="7" class="text-left">
									<span class="text-danger " v-if="errorEditDetail===false && itemDetail.agencyNameEN === ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}</span>
								</b-col>
							</b-row>
				</b-col>
				<b-col md="6">
						<b-form-group horizontal :label-cols="5"
								label-size="md"
								:label="$t('CITY_PROFILE')"
								label-for="city"
								label-text-align="right">
										<b-form-select  id="city"
									type="text"
									:options="filterbyCountryEN"
									name="city"
									value-field="id"
									text-field="title"
										size="md"
										v-model.trim="itemDetail.cityId" ></b-form-select>
										<span class="text-danger" v-if="errorEditDetail===false && itemDetail.city === 0">
									{{$t('ValidateLocation_cb_AvaiSearch')}}
								</span>
								</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('Email')"
								label-for="emailDetail"
								label-text-align="right">
									<b-form-input id="emailDetail"
									type="text" name="email"
									v-model="itemDetail.email"
								></b-form-input>
								</b-form-group>
							<b-row>
								<b-col md="5"></b-col>
								<b-col md="7" class="text-left">
									<span class="text-danger " v-if="errorEditDetail===false && itemDetail.email === ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}</span>
									<span class="text-danger" v-if="validateEmail(this.itemDetail.email) === false && itemDetail.email !== ''">
										{{$t('EMAILADDRESS_ERROR_REQUIRED')}}
									</span>
								</b-col>
							</b-row>
				</b-col>
				<b-col md="6" >
						<b-form-group horizontal :label-cols="5"
								label-size="md"
								:label="$t('DISTRICT_PROFILE')"
								label-for="city"
								label-text-align="right">
										<b-form-select  id="city"
									type="text"
									:options="filterbyCityEN"
									name="city"
									value-field="id"
									text-field="title"
										size="md"
										v-model.trim="itemDetail.locId" ></b-form-select>
										<span class="text-danger" v-if="errorEditDetail===false && itemDetail.city === 0">
									{{$t('ValidateLocation_cb_AvaiSearch')}}
								</span>
								</b-form-group>
				</b-col>
			</b-row>
			<!-- note 2 -->
			<b-row>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('MOBILE_PROFILE')"
								label-for="mobile"
								label-text-align="right">
									<b-form-input id="mobile"
									type="text" name="mobile"
									v-model="itemDetail.mobileno"
								></b-form-input>
								</b-form-group>
							<b-row>
								<b-col md="5"></b-col>
								<b-col md="7" class="text-left">
									<span class="text-danger " v-if="errorEditDetail===false && itemDetail.mobileno == ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}</span>
								</b-col>
							</b-row>
				</b-col>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('ADDRESS_PROFILE')"
								label-for="addresEN"
								label-text-align="right">
									<b-form-input id="addresEN"
									type="text" name="addresEN"
									v-model="itemDetail.addresEN"
								></b-form-input>
								</b-form-group>
							<b-row>
								<b-col md="5"></b-col>
								<b-col md="7" class="text-left">
									<span class="text-danger " v-if="errorEditDetail===false && itemDetail.addresEN === ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}</span>
								</b-col>
							</b-row>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" >
						<b-form-group horizontal
								:label-cols="5"
								label-size="md"
								:label="$t('WEBSITE_PROFILE')"
								label-for="website"
								label-text-align="right">
									<b-form-input id="website"
									type="text" name="website"
									v-model="itemDetail.website"
								></b-form-input>
								</b-form-group>

				</b-col>
				<b-col md="6" >
						<b-form-group horizontal
								:label-cols="5"
								label-size="md"
								:label="$t('PREFERED_CURRENCY_PROFILE')"
								label-for="currency"
								label-text-align="right">
									<b-form-select  id="currency"
									type="text"
									:options="lstCurrency"
									name="currency"
									value-field="code"
									text-field="code"
										size="md"
										v-model="itemDetail.currency" ></b-form-select>
								<!-- <span class="text-danger" v-if="errors.has('city')">
									{{ errors.first('city') }}
								</span> -->
								<span class="text-danger" v-if="errorEditDetail===false && itemDetail.currency === ''">
									{{$t('ValidateLocation_cb_AvaiSearch')}}
								</span>
								</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" >
						<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('ZIP_CODE_PROFILE')"
								label-for="zipcode"
								label-text-align="right">
									<b-form-input id="zipcode"
									type="text" name="zipcode"
									v-model="itemDetail.zipcode"
								></b-form-input>
								</b-form-group>
							<b-row>
								<b-col md="5"></b-col>
								<b-col md="7" class="text-left">
									<span class="text-danger " v-if="errorEditDetail===false && itemDetail.zipcode == ''">
										{{ $t('ValidateLocation_cb_AvaiSearch') }}</span>
								</b-col>
							</b-row>
				</b-col>
				<b-col md="6" >
					<b-form-group horizontal class="validateProfile"
								:label-cols="5"
								label-size="md"
								:label="$t('TELEPHONE_PROFILE')"
								label-for="telephone"
								label-text-align="right">
						<b-form-input id="telephone"
									type="text" name="telephone"
									v-model="itemDetail.telephoneNo">
						</b-form-input>
					</b-form-group>
					<b-row>
						<b-col md="5"></b-col>
						<b-col md="7" class="text-left">
							<span class="text-danger " v-if="errorEditDetail===false && itemDetail.telephoneNo === ''">
								{{ $t('ValidateLocation_cb_AvaiSearch') }}</span>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" >
				</b-col>
				<b-col md="6" >
						<b-form-group horizontal
								:label-cols="5"
								label-size="md"
								:label="$t('SKYPE_ID_PROFILE')"
								label-for="skype"
								label-text-align="right">
									<b-form-input id="skype"
									type="text" name="skype"
									v-model="itemDetail.skype"
								></b-form-input>
						</b-form-group>
				</b-col>
			</b-row>
		   </b-tab>
	   	</b-tabs>
		<b-row class="mt-3">
			<b-col class="text-center">
				<b-alert :show="errorAlertTabEditDetail" dismissible variant="danger">{{$t('ALERT_ERROR_MULTILANG_PROFILEDETAIL')}}</b-alert>
			</b-col>
		</b-row>
	  <div class="text-right">
		<b-button variant="outline-primary" @click="hideModal" size="md" @click.stop="hideModal('profileDetail')">
		{{$t('Cancel')}}
			</b-button>
			<b-button variant="primary" class="btn-yellow" size="md" @click.stop="editProfileDetail(itemDetail)" style=" width: 200px;">
		{{$t('Save')}}
		</b-button>
	   </div>
    </b-modal>
<!-- edit user -->
<!-- <b-modal size="sm" hide-footer hide-header id="editUser" @hide="resetModal">
      <h4>{{item.tittle}}</h4>
	  <br>
	  <b-row>
		  <b-col>{{$t('USERNAME_PROFILE')}}</b-col>
	  </b-row>
	  <b-row>
		  <b-col>
			  <b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" v-if="item.tittle=== $t('Add_User_PROFILE')">
				<b-form-input id="userName" type="text" name="userName" :formatter="format" v-model.trim="item.userName" ></b-form-input>
				</b-form-group>
				<b-form-group  class="validateProfile"  label-size="md"	label-for="userName" label-text-align="right" v-else>
					<b-form-input id="userName" disabled type="text" name="userName" v-model.trim="item.userName" ></b-form-input>
				</b-form-group>
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
	  <b-row  v-if="item.tittle=== $t('Add_User_PROFILE')">
		  <b-col>{{$t('PASSWORD_LBL_LOGIN')}}</b-col>
	  </b-row>
	  <b-row v-if="item.tittle=== $t('Add_User_PROFILE')">
		  <b-col >
			<b-form-group  class="validateProfile"  label-size="md" label-for="passwordUser" label-text-align="right">
				<b-form-input id="passwordUser" type="password" name="password" v-model.trim="item.password" ></b-form-input>
			</b-form-group>
			<b-row >
				<b-col >
				<span class="text-danger" v-if="errorAgent===false && item.password.length < 8">
					{{ $t('PASSWORD_ERROR_REQUIRED') }}
            	</span>
				</b-col>
			</b-row>
		</b-col>
	  </b-row>
	  <b-row v-if="item.tittle=== $t('Add_User_PROFILE')">
		  <b-col>{{$t('CfPassword_PROFILE')}}</b-col>
	  </b-row>
	  <b-row v-if="item.tittle=== $t('Add_User_PROFILE')">
		<b-col >
			<b-form-group class="validateProfile" label-size="md"  label-for="CfpasswordUser" label-text-align="right">
				<b-form-input id="CfpasswordUser" type="password" name="password" v-model.trim="item.cfpassword"></b-form-input>
			</b-form-group>
			<b-row >
				<b-col>
				<span class="text-danger" v-if="errorAgent===false && item.cfpassword === ''">
                      {{$t('ValidateLocation_cb_AvaiSearch')}}
                </span>
				<span class="text-danger" v-if="item.password !== item.cfpassword && item.cfpassword.length > 0">
                      {{$t('CFNEWPASS_ERROR_REQUIRED')}}
                </span>
				</b-col>
			</b-row>
		</b-col>
	  </b-row>
	  <b-row>
		  <b-col>{{$t('FULL_NAME_PROFILE')}}</b-col>
	  </b-row>
	  <b-row >
        <b-col md="7">
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
		<b-col>
			<b-form-group class="validateProfile" label-size="md" label-for="gender"  label-text-align="right">
				<b-form-radio-group id="gender" name="gender" v-model="item.gender" class="pt-2">
					<b-form-radio value= "1">{{$t('Gentlemen')}}</b-form-radio>
					<b-form-radio value= "0">{{$t('Lady')}}</b-form-radio>
				</b-form-radio-group>
			</b-form-group>
		</b-col>
      </b-row>
	  <b-row>
		   <b-col>{{$t('Email')}}</b-col>
	  </b-row>
	  <b-row >
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
	  <b-row>
		  <b-col>{{$t('Designation1_REGISTER')}}</b-col>
		   <b-col>{{$t('ACCESS_PROFILE')}}</b-col>
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
		<b-col>
			<b-row>
				<b-col v-if="roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN'">
						<b-form-group  class="validateProfile"
								label-size="md"
								label-for="role"
								label-text-align="right">
									<b-form-select id="role" type="text" :options="lstRole"	name="role"	value-field="name" text-field="name"
										size="md"
										v-model.trim="item.role" ></b-form-select>
								</b-form-group>
				</b-col>
				<b-col v-if="roleAgent[0] === 'ROLE_TRAVEL_AGENT_USER'">
					<b-form-group  class="validateProfile"
							label-size="md"
							label-for="role"
							label-text-align="right">
								<b-form-select id="role" type="text" :options="lstRoleUser"	name="role"	value-field="name" text-field="name"
									size="md" v-model.trim="item.role" ></b-form-select>
							</b-form-group>
				</b-col>
			</b-row>
		</b-col>
	  </b-row>
	  <b-row>
		<b-col md="1" v-if="item.tittle===$t('Edit_User_PROFILE') && roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN' && item.userName !== $store.getters['user/userName']">
				<b-form-group class="validateProfile"  label-size="md" label-for="active"  label-text-align="right">
					<b-form-checkbox v-model="item.status" id="active" name="active"  value="true" unchecked-value="false"></b-form-checkbox>
				</b-form-group>
		</b-col>
		<b-col v-if="item.tittle===$t('Edit_User_PROFILE') && roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN' && item.userName !== $store.getters['user/userName']">{{$t('Status_row_AffiliateNetwork')}}</b-col>
	  </b-row>
	   <b-row class="text-center">
		   <b-col>
			   <b-button variant="link" @click="hideModal" size="md" @click.stop="hideModal('editUser')" style=" width: 100px;height: 40px; border-radius: 5px; border: solid 1px #258fe0;">
				{{$t('Cancel')}}
				</b-button>
		   </b-col>
			<b-col>
				<b-button v-if="item.tittle===$t('Edit_User_PROFILE')" variant="primary" class="btn-yellow" size="md" @click.stop="editUserAgent(item)" style=" width: 200px;height: 40px;  border-radius: 5px; background-color:  #258fe0;">
					{{$t('Save')}}
				</b-button>
				<b-button v-if="item.tittle===$t('Add_User_PROFILE')" variant="primary" class="btn-yellow" size="md" @click.stop="added(item)" style=" width: 200px;height: 40px;  border-radius: 5px; background-color:  #258fe0;">
					{{$t('Save')}}
				</b-button>
			</b-col>
	   </b-row>
    </b-modal> -->
	<b-modal size="sm" hide-footer hide-header id="deleteUser">
		<!-- <h4>{{$t('Warning')}}</h4>
		<hr> -->
		<div style="width:90%;margin:auto;">
			<p style="text-left;font-weight: bold;">{{$t('DELETE_USER')}}</p>
			<br>
			<p style="text-left;">{{$t('ALERT_DELETE_PROFILE')}}</p>
			<br>
			<div class="text-center">
				<b-button variant="link" size="md" @click="hideModal" @click.stop="hideModal('deleteUser')" style="width: 100px;
					margin-left:-10px;
					height: 40px;
					border-radius: 5px;
					border: solid 1px #258fe0;">
				{{$t('Cancel')}}
				</b-button>

				<b-button variant="danger" size="md" class="btn-yellow"  @click.stop="deleted(item)" style="width: 200px;
					height: 40px;
					border-radius: 5px;
					background-color: #d9390d;">
					{{$t('DELETE')}}
				</b-button>
			</div>
		</div>
	</b-modal>
	<b-modal size="sm" hide-footer hide-header id="modalStatus" no-close-on-backdrop no-close-on-esc>
		<div style="width:90%;margin:auto;">
			<p style="font-weight: bold;">{{$t('Title_ChangeStatus')}} </p>
			<br>
			<div v-if="statusUserAgent === true" class="text-left">
				<p>{{$t('AlertStatus_True')}} <b>{{changeStatusUserAgent}}</b></p>
			</div>
			<div v-else  class="text-left">
				<p>{{$t('AlertStatus_False')}} <b>{{changeStatusUserAgent}}</b></p>
			</div >
			<br>
			<div class="text-center">
				<b-button variant="link" size="md" @click.stop="hideModalChangeStatus('modalStatus')" style="width: 100px;
						height: 40px;
						border-radius: 5px;
						border: solid 1px #258fe0;">
					{{$t('Cancel')}}
				</b-button>
				<b-button variant="danger" class="btn-yellow" size="md" @click.stop="actionStatus(item)" style="width: 200px;
						height: 40px;
						border-radius: 5px;
						background-color: #d9390d;">
				{{$t('Confirm_col_AffiliateNetwork')}}
				</b-button>
			</div>
		</div>
	</b-modal>

	<!-- new popup thêm người dùng -->
		<b-modal size="md" hide-footer hide-header id="addUser" @hide="resetModal">
			<h4>{{item.tittle}}</h4>
			<br>
			<b-container>
				<b-row>
					<b-col>
						<b-row>
							<b-col>{{$t('USERNAME_PROFILE')}}</b-col>
						</b-row>
						<b-row>
							<b-col>
								<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" v-if="item.tittle=== $t('Add_User_PROFILE')">
									<b-form-input id="userName" type="text" name="userName" :formatter="format" v-model.trim="item.userName" ></b-form-input>
								</b-form-group>
								<b-form-group  class="validateProfile"  label-size="md"	label-for="userName" label-text-align="right" v-else>
									<b-form-input id="userName" disabled type="text" name="userName" v-model.trim="item.userName" ></b-form-input>
								</b-form-group>
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
						<b-row v-if="item.tittle=== $t('Add_User_PROFILE')">
							<b-col>{{$t('PASSWORD_LBL_LOGIN')}}</b-col>
						</b-row>
						<b-row v-if="item.tittle === $t('Add_User_PROFILE')">
							<b-col >
								<b-form-group  class="validateProfile"  label-size="md" label-for="passwordUser" label-text-align="right">
									<b-form-input id="passwordUser" type="password" name="password" v-model.trim="item.password" ></b-form-input>
								</b-form-group>
								<b-row >
									<b-col >
									<span class="text-danger" v-if="errorAgent===false && item.password.length < 8">
										{{ $t('PASSWORD_ERROR_REQUIRED') }}
									</span>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</b-col>
					<b-col>
							<br>
							<b-row>
									<b-col>
										<b-button :variant="variantAddUserGentlemen" size="md"  @click="genderAddUser(1)"
												   style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Gentlemen')}}
										</b-button>
										<b-button :variant="variantAddUserLady" size="md" @click="genderAddUser(0)"
												   style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Lady')}}
										</b-button>
										<!-- <b-form-group class="validateProfile" label-size="md" label-for="gender"  label-text-align="right">
											<b-form-radio-group id="gender" name="gender" v-model="f" class="pt-2">
												<b-form-radio value= "1">{{$t('Gentlemen')}}</b-form-radio>
												<b-form-radio value= "0">{{$t('Lady')}}</b-form-radio>
											</b-form-radio-group>
										</b-form-group> -->
									</b-col>
							</b-row>
					</b-col>
				</b-row>
				<!-- end row password and gender -->
				<b-row>
					<b-col>
							<b-row v-if="item.tittle=== $t('Add_User_PROFILE')">
								<b-col>{{$t('CfPassword_PROFILE')}}</b-col>
							</b-row>
							<b-row v-if="item.tittle=== $t('Add_User_PROFILE')">
								<b-col >
									<b-form-group class="validateProfile" label-size="md"  label-for="CfpasswordUser" label-text-align="right">
										<b-form-input id="CfpasswordUser" type="password" name="password" v-model.trim="item.cfpassword"></b-form-input>
									</b-form-group>
									<b-row >
										<b-col>
										<span class="text-danger" v-if="errorAgent===false && item.cfpassword === ''">
											{{$t('ValidateLocation_cb_AvaiSearch')}}
										</span>
										<span class="text-danger" v-if="item.password !== item.cfpassword && item.cfpassword.length > 0">
											{{$t('CFNEWPASS_ERROR_REQUIRED')}}
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
				<!--end row confirmpass and mobile -->
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
				<!-- end row designation and email -->
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
								<b-col>{{$t('ACCESS_PROFILE')}}</b-col>
							</b-row>
							<b-row>
								<b-col v-if="roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN'">
									<b-form-group  class="validateProfile"
										label-size="md"
										label-for="role"
										label-text-align="right">
										<b-button :variant="variantAddUserAdmin" size="md"  @click="RoleAddUser(item.role,'ROLE_TRAVEL_AGENT_ADMIN')"
												   style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Admin')}}
										</b-button>
										<b-button :variant="variantAddUserUser" size="md" @click="RoleAddUser(item.role,'ROLE_TRAVEL_AGENT_USER')"
												   style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('User')}}
										</b-button>
											<!-- <b-form-select id="role" type="text" :options="lstRole" name="role"	value-field="name" text-field="name"
												size="md"
												v-model.trim="item.role" >
											</b-form-select> -->
									</b-form-group>
								</b-col>
								<b-col v-if="roleAgent[0] === 'ROLE_TRAVEL_AGENT_USER'">
									<b-form-group  class="validateProfile"
											label-size="md"
											label-for="role"
											label-text-align="right">
											<b-button @click="hideModal" size="md"
												   style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('User')}}
											</b-button>
												<!-- <b-form-select id="role" type="text" :options="lstRoleUser"	name="role"	value-field="name" text-field="name"
													size="md" v-model.trim="item.role" >
												</b-form-select> -->
									</b-form-group>
								</b-col>
							</b-row>
					</b-col>
				</b-row>
				<!-- end row address and access -->
				<br>
				<b-row>
					<b-col md="1" v-if="item.tittle===$t('Edit_User_PROFILE') && roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN' && item.userName !== $store.getters['user/userName']">
							<b-form-group class="validateProfile"  label-size="md" label-for="active"  label-text-align="right">
								<b-form-checkbox v-model="item.status" id="active" name="active"  value="true" unchecked-value="false"></b-form-checkbox>
							</b-form-group>
					</b-col>
					<b-col v-if="item.tittle===$t('Edit_User_PROFILE') && roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN' && item.userName !== $store.getters['user/userName']">{{$t('Status_row_AffiliateNetwork')}}</b-col>
				</b-row>
				<div class="text-center">
					<b-button variant="link" @click="hideModal" size="md" @click.stop="hideModal('addUser')" style=" width: 100px;height: 40px; border-radius: 5px; border: solid 1px #258fe0;">
						{{$t('Cancel')}}
					</b-button>
					<b-button v-if="item.tittle===$t('Add_User_PROFILE')" variant="primary" class="btn-yellow" size="md" @click.stop="added(item)" style=" width: 200px;height: 40px;  border-radius: 5px; background-color:  #258fe0;">
						{{$t('Save')}}
					</b-button>
				</div>
			</b-container>
		</b-modal>

		<!-- Popup edit nguoi dung -->
		<b-modal size="md" hide-footer hide-header id="editUser" @hide="resetModal">
			<h4>{{item.tittle}}</h4>
			<br>
			<b-container>
				<b-row>
					<b-col>
						<b-row>
							<b-col>{{$t('USERNAME_PROFILE')}}</b-col>
						</b-row>
						<b-row>
							<b-col>
								<b-form-group  class="validateProfile"  label-size="md" label-for="userName" label-text-align="right" v-if="item.tittle=== $t('Add_User_PROFILE')">
									<b-form-input id="userName" type="text" name="userName" :formatter="format" v-model.trim="item.userName" ></b-form-input>
								</b-form-group>
								<b-form-group  class="validateProfile"  label-size="md"	label-for="userName" label-text-align="right" v-else>
									<b-form-input id="userName" disabled type="text" name="userName" v-model.trim="item.userName" ></b-form-input>
								</b-form-group>
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
							<br>
							<b-row>
									<b-col>
										<b-button :variant="variantEditUserGentlemen" size="md"  @click="genderEditUser(1)"
												   style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Gentlemen')}}
										</b-button>
										<b-button :variant="variantEditUserLady" size="md" @click="genderEditUser(0)"
												   style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Lady')}}
										</b-button>
										<!-- <b-form-group class="validateProfile" label-size="md" label-for="gender"  label-text-align="right">
											<b-form-radio-group id="gender" name="gender" v-model="item.gender" class="pt-2">
												<b-form-radio value= "1">{{$t('Gentlemen')}}</b-form-radio>
												<b-form-radio value= "0">{{$t('Lady')}}</b-form-radio>
											</b-form-radio-group>
										</b-form-group> -->
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
							<b-col md="1" v-if="item.tittle === $t('Edit_User_PROFILE') && roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN' && item.userName !== $store.getters['user/userName']">
									<b-form-group class="validateProfile"  label-size="md" label-for="active"  label-text-align="right">
										<b-form-checkbox v-model="item.status" id="active" name="active"  value="true" unchecked-value="false"></b-form-checkbox>
									</b-form-group>
							</b-col>
							<b-col v-if="item.tittle===$t('Edit_User_PROFILE') && roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN' && item.userName !== $store.getters['user/userName']">{{$t('Status_row_AffiliateNetwork')}}</b-col>
						</b-row>
					</b-col>
					<b-col>
						<b-row>
							<b-col>{{$t('ACCESS_PROFILE')}}</b-col>
						</b-row>
						<b-row>
							<b-col v-if="roleAgent[0] === 'ROLE_TRAVEL_AGENT_ADMIN'">
								<b-button :variant="variantEditUserAdmin" size="md"  @click="RoleEditUser(item.role,'ROLE_TRAVEL_AGENT_ADMIN')"
									style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('Admin')}}
								</b-button>
								<b-button :variant="variantEditUserUser" size="md" @click="RoleEditUser(item.role,'ROLE_TRAVEL_AGENT_USER')"
									style=" width: 100px; height: 35px; border-radius: 40px 40px 40px 40px;">{{$t('User')}}
								</b-button>
								<!-- <b-form-group  class="validateProfile"
									label-size="md"
									label-for="role"
									label-text-align="right">
										<b-form-select id="role" type="text" :options="lstRole"	name="role"	value-field="name" text-field="name"
											size="md"
											v-model.trim="item.role" >
										</b-form-select>
								</b-form-group> -->
							</b-col>
							<!-- <b-col v-if="roleAgent[0] === 'ROLE_TRAVEL_AGENT_USER'">
								<b-form-group  class="validateProfile"
										label-size="md"
										label-for="role"
										label-text-align="right">
											<b-form-select id="role" type="text" :options="lstRoleUser"	name="role"	value-field="name" text-field="name"
												size="md" v-model.trim="item.role" >
											</b-form-select>
								</b-form-group>
							</b-col> -->
						</b-row>
					</b-col>
				</b-row>
				<!-- end row status and access -->
				<br>
				<!-- start row button save and cancel -->
				<div class="text-center">
					<b-button variant="link" @click="hideModal" size="md" @click.stop="hideModal('editUser')" style=" width: 100px;height:40px; border-radius: 5px; border: solid 1px #258fe0;">
						{{$t('Cancel')}}
					</b-button>
					<b-button v-if="item.tittle===$t('Edit_User_PROFILE')" variant="primary" class="btn-yellow" size="md" @click.stop="editUserAgent(item)" style=" width: 200px;height: 40px;  border-radius: 5px; background-color:  #258fe0;">
						{{$t('Save')}}
					</b-button>
				</div>
				<!-- end row button save and cancel -->
			</b-container>
		</b-modal>
	</div>
</template>

