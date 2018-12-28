<style src="./HotelsOfTA.scss" module lang="scss">

</style>

<style lang="scss">
	@import './HotelsOfTA.scss';
</style>

<script src="./HotelsOfTA.js">

</script>

<template>
	<div class="mainHotelOfTa">
		<b-row class="my-3" style="margin:0px">
			<b-col md="3" style="margin-top:7px">
				<NavBarLeft class="my-3" @currentViewUpdate="currentView=$event"></NavBarLeft>
				<!-- this.$emit('currentViewUpdate', 'ApplyforAccess') || this.$emit('currentViewUpdate', 'AffiliateNetwork') -->
				<div id="searchbarr" class="my-2" style="border: none; ">
					<div class="headerSearch">
                        <p><img src="~icons/Search-gray.png" width="25px" height="25px" /> {{$t('ModifySearch')}}</p>
                    </div>
					<div id="formSearch" v-if="currentView ==='ApplyforAccess'" v-on:keyup.enter="changeFilterApply()">
						<b-form-group label-size="md" :label="$t('Solution_li5_FooterLoginRegister')" label-for="hotel" label-text-align="left">
							<b-form-input id="hotel" type="text" name="hotel" v-model="hotel" size="md" placeholder='(Eg Pullman Suits)'></b-form-input>
						</b-form-group>
						<b-form-group label-size="md" :label="$t('Country_HotelOfTA')" label-for="country" label-text-align="left">
							<b-form-select id="country" type="text" name="country" v-model="selected" :options="lstCountry" value-field="title" text-field="title" size="md">
								<template slot="first">
						            <option value=""></option>
                                </template>
			                </b-form-select>
                        </b-form-group>
                </div>
	<div id="formSearch" v-if="currentView=='AffiliateNetwork'"  v-on:keyup.enter= "changeFilterAffiNetwork()">
         <b-form-group
                label-size="md"
                :label="$t('Solution_li5_FooterLoginRegister')"
                label-for="hotel"
                label-text-align="left">
                     <b-form-input id="hotel"
                      type="text" name="hotel"
                      v-model="hotel1"
                        size="md" placeholder='(Eg Pullman Suits)'>
                    </b-form-input>
        </b-form-group>
         <b-form-group

                label-size="md"
                :label="$t('Country_HotelOfTA')"
                label-for="country"
                label-text-align="left">
            <b-form-select id="country"
                      type="text" name="country"
                      v-model="selected1"
                       :options="lstCountry"
                      value-field="title"
                       text-field="title"
                size="md">
                <template slot="first">
                    <option value="">
                    </option>
                </template>
			</b-form-select>

        </b-form-group>
    </div>
	<!-- reservation search -->

	<br>
	<div id="search" v-if="currentView=='ApplyforAccess'">
            <b-button class=" btn-radius text-white" @click="changeFilterApply"  variant="primary"  size="md"><img  src="~icons/Search-white.png" width="25px">{{$t('Search_btn_ResultSearch')}}</b-button>
	</div>
	<div id="search"  v-if="currentView=='AffiliateNetwork'">
            <b-button class=" btn-radius text-white" @click="changeFilterAffiNetwork"  variant="primary"  size="md"><img  src="~icons/Search-white.png" width="25px">{{$t('Search_btn_ResultSearch')}}</b-button>
	</div>
	<div id="search" v-if="currentView=='ReservationSearch'">
            <b-button class=" btn-radius text-white" @click="changeFilterReservationSearch"  variant="primary"  size="md"><img  src="~icons/Search-white.png" width="25px">{{$t('Search_btn_ResultSearch')}}</b-button>
	</div>
	</div>
		<!-- Rooter -->
        </b-col>
            <b-col>
                <keep-alive>
                    <component @pdata="linkPage($event)" :is="currentView" :filter="filter"></component>
                </keep-alive>
            </b-col>
                </b-row>
            </div>
</template>

