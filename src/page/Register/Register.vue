<style lang="scss">
@import "./Register.scss";
</style>

<script src="./Register.js">
</script>

<template>
	<div id="register">
		<back-to-top visibleoffset="200">
			<icon class="ml-2 pt-1" name="arrow-alt-circle-up" scale="2" style="color:rgb(111, 126, 150)"></icon>
		</back-to-top>
		<ModalRegister :show="showModal" @close="showModal = false" ></ModalRegister>
		<div class="mainRegister">
			<b-row >
				<b-col md="4" style="background-color: #fff;" class="text-dark py-3 ">
					<br>
					<br><br>
					<b-row style="margin:0;">
						<b-col >
							<span>
								<b>{{$t('HelloezB2B_p1_FooterLoginRegister')}}</b>
								<br>
								<br>
								{{$t('Tittle_Register')}}!!
							</span>
						</b-col>
					</b-row>
					<b-row class="my-4">
						<b-col md="2" >
							<img class="ml-3 p-0 " src="~icons/best.png" width="30px" height="30px" />
						</b-col>
						<b-col class="mt-2" md="5">
							<span>{{$t('Rate_Register')}}</span>
						</b-col>
					</b-row>
					<b-row class="my-3">
						<b-col md="2">
							<img class="ml-3 p-0" src="~icons/billblack.png" width="30px" height="30px" />
						</b-col>
						<b-col class="mt-2" md="5">
							<span>{{$t('Invoice_Register')}}</span>
						</b-col>
					</b-row>
					<b-row class="my-3">
						<b-col md="2" >
							<img class="ml-3 p-0" src="~icons/create your sub agent.png" width="30px" height="30px" />
						</b-col>
						<b-col class="mt-2" md="5">
							<span>{{$t('CreateAgent_Register')}}</span>
						</b-col>
					</b-row>
					<b-row class="my-3">
						<b-col md="2" >
							<img class="ml-3 p-0" src="~icons/editblack.png" width="30px" height="30px" />
						</b-col>
						<b-col class="mt-2" md="5">
							<span>{{$t('MarkupModule_Register')}}</span>
						</b-col>
					</b-row>
					<b-row class="my-3">
						<b-col md="2" >
							<img class="ml-3 p-0" src="~icons/packageblack.png" width="30px" height="30px" />
						</b-col>
						<b-col class="mt-2" md="5">
							<span>{{$t('Products_Register')}}</span>
						</b-col>
					</b-row>
					<b-row class="my-3">
						<b-col md="2" >
							<img class="ml-3 p-0" src="~icons/favoriteblack.png" width="30px" height="30px" />
						</b-col>
						<b-col class="mt-2" md="5">
							<span>{{$t('FavoriteList_Register')}}</span>
						</b-col>
					</b-row>
					<b-row class="my-3">
						<b-col md="2" >
							<img class="ml-3 p-0" src="~icons/shopping cartblack.png" width="30px" height="30px" />
						</b-col>
						<b-col class="mt-2" md="5">
							<span>{{$t('ShoppingCart_Register')}}</span>
						</b-col>
					</b-row>
					<!-- </div> -->
				</b-col>

				<b-col md="8" class="" style="color:#0b2e4d;font-weight: 600;background-color: #f2f2f2;height:700px;">
					<b-row>
						<b-col>
							<b-form id="form-register" @submit="onSubmit" @reset="onReset" v-if="show" @submit.prevent="validateBeforeSubmit">
							 <md-steppers :md-active-step.sync="active" md-alternative>
								<md-step id="first" md-label="Your Information"  :md-done.sync="first" :md-editable="false">
									<b-row>
										<b-col>
											<b-row >
												<b-col md="3"></b-col>
												<b-col md="6" >
													<b-row>
														<b-col class="ml-3"><b>{{$t('Name_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col >
															<b-form-group  class="validateRegister"  label-size="md"  label-for="name" label-text-align="right">
																<b-form-input class="input-radius"  v-validate="'required'" id="name" type="text" name="name" size="md" v-model.trim="form.name" style="border:0px"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col>
																	<span class="text-danger " v-if="errors.has('name')">
																	{{ $t('NAME_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<b-row>
												<b-col md="3"></b-col>
												<b-col md="6" >
													<b-row>
														<b-col class="ml-3"><b>{{$t('Designation_REGISTER')}}</b></b-col>
														<b-col class="ml-3"><b>{{$t('MOBILE_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col md="6" >
															<b-form-group class="validateRegister" :label-cols="5" label-size="md"  label-for="designation" label-text-align="right">
																<b-form-input class="input-radius" v-validate="'required'" id="designation" type="text" v-model="form.designation" name="designation" size="md" style="border:0px"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('designation')">
																	{{ $t('DESIGNATION_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
														<b-col md="6" class="mb-2">
															<b-form-group class="validateRegister" :label-cols="5" label-size="md" label-for="mobileno" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" v-validate="'required|numeric'" id="mobileno" type="text" name="mobileno" maxlength="11" size="md" v-model.trim="form.mobileno"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col  class="text-left">
																	<span class="text-danger " v-if="errors.has('mobileno')">
																	{{ $t('MOBILENO_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<b-row>
												<b-col md="3"></b-col>
												<b-col md="6">
													<b-row>
														<b-col class="ml-3"><b>{{$t('SKYPE_ID_PROFILE')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group :label-cols="5" label-size="md"  label-for="skypeid" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" id="skypeid" type="text" v-model="form.skypeid" name="skypeid" size="md">
																</b-form-input>
															</b-form-group>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<b-row >
												<b-col md="3"></b-col>
												<b-col md="6" class="text-center">
													<b-container>
														<b-button :disabled="errors.has('mobileno')|| errors.has('designation') || form.designation==='' || form.mobileno === ''" variant="primary" @click="setDone('first', 'second')" style="width:100%">Next <icon class="mt-1" name="arrow-right" scale="0.8" style="color:#ffff"></icon></b-button>
													</b-container>
												</b-col>
											</b-row>
										</b-col>
									</b-row>
								</md-step>
								<!-- step2 -->
								<md-step id="second" md-label="Agency Information" :md-error="secondStepError" :md-done.sync="second" :md-editable="false">
									<b-row>
										<b-col>
											<b-row >
												<b-col >
													<b-row>
														<b-col class="ml-3"><b>{{$t('TRAVEL_AGENCY_NAME_PROFILE')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group  class="validateRegister" :label-cols="5" label-size="md"  label-for="travelAgent" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" id="travelAgent" v-validate="'required'" type="text" v-model="form.travelAgent" name="travelAgent" size="md"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('travelAgent')">
																		{{ $t('AGENTNAME_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<b-row>
												<b-col  md="6">
													<b-row>
														<b-col class="ml-3"><b>{{$t('Business_Licence_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group  class="validateRegister" :label-cols="5" label-size="md"  label-for="business" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" v-validate="'required'" id="business" type="text" v-model="form.business" name="business" size="md"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('business')">
																	{{ $t('BUSINESS_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
												<b-col  md="6">
													<b-row>
														<b-col class="ml-3"><b>{{$t('TELEPHONE_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col  class="mb-2">
															<b-form-group class="validateRegister" :label-cols="5" label-size="md" label-for="telephoneno" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" v-validate="'numeric'" id="telephoneno" type="text" maxlength="11" v-model="form.telephoneno" name="telephoneno" size="md"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('telephoneno')">
																	{{ $t('TELEPHONE_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<b-row>
												<b-col >
													<b-row>
														<b-col class="ml-3"><b>{{$t('WEBSITE_PROFILE')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group class="validateRegister" :label-cols="5" label-size="md" label-for="website" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" id="website" type="text" name="website" v-model="form.website"></b-form-input>
															</b-form-group>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<b-row>
												<b-col>
													<b-row>
														<b-col class="ml-3"><b>E-mail*:</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group class="validateRegister" :label-cols="5" label-size="md"  label-for="emailAgent" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" v-validate="'required|email'" id="emailAgent" type="email" name="emailAgent" size="md" v-model.trim="form.email"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('emailAgent')">
																	{{ $t('EMAILADDRESS_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
										</b-col>
										<b-col>
											<b-row >
												<b-col >
													<b-row>
														<b-col class="ml-3"><b>{{$t('COUNTRY_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group  class="validateRegister" :label-cols="5" label-size="md"  label-for="Country" label-text-align="right">
																<b-form-select style="border:0px" class="input-radius" v-validate="'required'" plain id="country" type="text"  name="country"  size="md" v-model.trim="form.country">
																	<option v-for="option in lstCountry" :value="option.id" >{{option.title}}</option>
																</b-form-select>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('country')">
																	{{ $t('COUNTRY_ERROR_REQUIRED') }}
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
														<b-col class="ml-3"><b>{{$t('CITY_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group  class="validateRegister" :label-cols="5" label-size="md" label-for="city" label-text-align="right">
																<b-form-select style="border:0px" class="input-radius" plain  v-validate="'required'" id="city" type="text"  name="city" size="md" v-model.trim="form.city">
																	<option v-for="option in filterbyCountry" :value="option.id" >{{option.title}}</option>
																</b-form-select>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('city')">
																	{{ $t('CITY_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
												<b-col>
													<b-row>
														<b-col class="ml-3"><b>{{$t('LOCATION_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group  class="validateRegister" :label-cols="5" label-size="md"  label-for="confimaddressemail" label-text-align="right">
																<b-form-select style="border:0px" class="input-radius" plain state v-validate="'required'" id="location" type="text"  name="location" :select-size="2"  size="md" v-model.trim="form.locationID">
																	<option v-for="option in filterbyCity" :value="option.id" >{{option.title}}</option>
																</b-form-select>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('location')">
																	{{ $t('LOCATION_ERROR_REQUIRED') }}
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
														<b-col class="ml-3"><b>{{$t('ADDRESS_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group  class="validateRegister" :label-cols="5" label-size="md"  label-for="address" label-text-align="right" >
																<b-form-input style="border:0px" class="input-radius" v-validate="'required'" id="address" type="text" name="address" size="md" v-model.trim="form.address"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('address')">
																		{{ $t('ADDRESS_ERROR_REQUIRED') }}
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
														<b-col class="ml-3"><b>{{$t('ZIP_CODE_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group  class="validateRegister" :label-cols="5" label-size="md" label-for="zipcode" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" v-validate="'required|numeric|min:4'" id="zipcode" type="text" name="zipcode" size="md" v-model.trim="form.zipcode"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('zipcode')">
																	{{ $t('ZIPCODE_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
												<b-col>
													<b-row>
														<b-col class="ml-3"><b>{{$t('PREFFERED_CURRENCY_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group class="validateRegister" :label-cols="5" label-size="md"  label-for="currency" label-text-align="right">
																<b-form-select style="border:0px" class="input-radius" v-validate="'required'" id="currency" type="text" name="currency"   size="md" v-model.trim="form.currency">
																	<option v-for="option in lstCurrency" :value="option.code" >{{option.code}}</option>
																</b-form-select>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('currency')">
																	{{ $t('CURRENCY_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
										</b-col>
									</b-row>
									<br>
									<b-row >
										<b-col md="3"></b-col>
										<b-col md="3" class="text-center">
											<b-button variant="primary" @click="setBack1('second', 'first')" style="width:100%"><icon class="mt-1" name="arrow-left" scale="0.8" style="color:#ffff"></icon> Back </b-button>
										</b-col>
										<b-col md="3" class="text-center">
											<b-button :disabled="errors.has('travelAgent')||
																form.travelAgent ===''||
																errors.has('business')||
																form.business ===''||
																errors.has('telephoneno')||
																form.telephoneno===''||
																errors.has('emailAgent')||
																form.email===''||
																errors.has('country')||
																form.country===''||
																errors.has('city')||
																form.city===''||
																errors.has('location')||
																form.locationID===''||
																errors.has('address')||
																form.address===''||
																errors.has('zipcode')||
																form.zipcode===''||
																errors.has('currency')||
																form.currency===''" variant="primary" @click="setDone2('second', 'third')" style="width:100%">Next <icon class="mt-1" name="arrow-right" scale="0.8" style="color:#ffff"></icon></b-button>
										</b-col>
									</b-row>
								</md-step>
								<!-- step3 -->
								<md-step id="third" md-label="Create Account" :md-error="thircondStepError" :md-done.sync="third">
									<b-row>
										<b-col>
											<b-row >
												<b-col md="3"></b-col>
												<b-col md="6" >
													<b-row>
														<b-col class="ml-3"><b>E-mail*:</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group class="validateRegister" :label-cols="5" label-size="md"  label-for="username" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" v-validate="'required|email'" id="username" type="email" name="username" size="md" v-model.trim="form.username"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('username')">
																	{{ $t('USERNAME_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<b-row>
												<b-col md="3"></b-col>
												<b-col md="6" >
													<b-row>
														<b-col class="ml-3"><b>{{$t('Password_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col  class="mb-2">
															<b-form-group  class="validateRegister" :label-cols="5" label-size="md"  label-for="password" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" v-validate="'required|min:8'" id="password" type="password" name="password" v-model.trim="form.password">
																</b-form-input>
															</b-form-group>
															<b-row>
																<b-col class="text-left">
																	<span class="text-danger " v-if="errors.has('password')">
																	{{ $t('PASSWORD_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<b-row>
												<b-col md="3"></b-col>
												<b-col md="6">
													<b-row>
														<b-col class="ml-3"><b>{{$t('CfPassword_REGISTER')}}</b></b-col>
													</b-row>
													<b-row>
														<b-col class="mb-2">
															<b-form-group  class="validateRegister" :label-cols="5" label-size="md"  label-for="confirmpassword" label-text-align="right">
																<b-form-input style="border:0px" class="input-radius" v-validate="'required|confirmed:password'" id="confirmpassword" type="password" name="confirmpassword" size="md" v-model.trim="confirmpassword"></b-form-input>
															</b-form-group>
															<b-row>
																<b-col class="text-lef">
																	<span class="text-danger " v-if="errors.has('confirmpassword') && confirmpassword.length > 0">
																	{{ $t('CONFIRMPASSWORD_ERROR_REQUIRED') }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</b-col>
											</b-row>
											<b-row>
												<b-col class="">
													<b-form-group style="text-align:center" id="exampleGroup4">
														<b-form-checkbox-group v-model="form.checked" id="exampleChecks">
															<b-form-checkbox v-model="checked" value="1">{{ $t('TickTerms_REGISTER') }}<button id="show-modal" @click="showModal = true" class="text-primary"> {{ $t('TickTerms_REGISTER1') }}</button>
															</b-form-checkbox>
														</b-form-checkbox-group>
													</b-form-group>
												</b-col>
											</b-row>
											<b-row >
												<b-col md="3"></b-col>
												<b-col md="3" class="text-center">
													<b-button variant="primary" @click="setBack2('third', 'second')" style="width:100%"><icon class="mt-1" name="arrow-left" scale="0.8" style="color:#ffff"></icon> Back </b-button>
												</b-col>
												<b-col md="3" class="text-center">
													<b-button  class="btn-radius" @click="showAlert" type="submit" variant="primary" size="md" :disabled="checked!='1'" style="width:100%">{{ $t('Sign_Up_REGISTER') }} <icon class="mt-1" name="arrow-right" scale="0.8" style="color:#ffff"></icon></b-button>
												</b-col>
											</b-row>
										</b-col>
									</b-row>

								</md-step>
							</md-steppers>
							</b-form>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

