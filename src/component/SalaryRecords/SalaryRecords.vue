<style src="./SalaryRecords.scss" module lang="scss"></style>
<script src="./SalaryRecords.js"></script>

<template>
	<div>
		<b-row>
			<b-col class="ml-3">Tháng: <b-form-input id="Name" type="number"  v-model.trim="month" :min="0" :max="12" name="Name" size="md" maxlength="50"></b-form-input></b-col>
			<b-col>Năm: <b-form-input id="Name" type="number"  v-model.trim="year" :min="2010" name="Name" size="md" maxlength="50"></b-form-input></b-col>
			<b-col class="mt-4"><b-button variant="warning" v-on:click="searchluong(month,year)" style="width:100%">Tìm kiếm</b-button>
			</b-col>
			<b-col class="mt-4 mr-3">
				<b-button style="width:100%"  variant="danger" @click="exportTableToExcel('tableKt','danh sach lương')">
              		  Export
           		 </b-button>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col>
				<md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card id="tableKt">
					<md-table-toolbar>
						<div class="md-toolbar-section-start">
						<h5 >Danh sách lương nhân viên theo tháng {{month}}/{{year}}</h5>
						</div>
						<md-field md-clearable class="md-toolbar-section-end">
						<md-input placeholder="Tìm kiếm theo tên nhân viên..." v-model="search" @input="searchOnTable" />
						</md-field>
					</md-table-toolbar>
					<md-table-row slot="md-table-row" slot-scope="{ item }">
						<md-table-cell md-label="employeeId" md-sort-by="id" >{{ item.employeeId }}</md-table-cell>
						<md-table-cell md-label="employeeName" md-sort-by="id" >{{ item.employeeName }}</md-table-cell>
						<md-table-cell md-label="salaryBasic" md-sort-by="name">{{ item.salaryBasic }}</md-table-cell>
						<md-table-cell md-label="allowanceHaveLunch" md-sort-by="email">{{ item.allowanceHaveLunch }}</md-table-cell>
						<md-table-cell md-label="allowanceParking" md-sort-by="email">{{ item.allowanceParking }}</md-table-cell>
						<md-table-cell md-label="allowanceCall" md-sort-by="email">{{ item.allowanceCall }}</md-table-cell>
						<md-table-cell md-label="allowanceOther" md-sort-by="email">{{ item.allowanceOther }}</md-table-cell>
						<md-table-cell md-label="noLate" md-sort-by="email">{{ item.noLate }}</md-table-cell>
						<md-table-cell md-label="noWorkStandard" md-sort-by="email">{{ item.noWorkStandard }}</md-table-cell>
						<md-table-cell md-label="noWork" md-sort-by="email">{{ item.noWork }}</md-table-cell>
						<md-table-cell md-label="salaryPerDay" md-sort-by="salaryPerDay">{{ item.salaryPerDay }}</md-table-cell>
						<md-table-cell md-label="percentInsurance" md-sort-by="percentInsurance">{{ item.percentInsurance }}</md-table-cell>
						<md-table-cell md-label="percentPersonalTaxRate" md-sort-by="percentPersonalTaxRate">{{ item.percentPersonalTaxRate }}</md-table-cell>
						<md-table-cell md-label="disciplineLateMoney" md-sort-by="disciplineLateMoney">{{ item.disciplineLateMoney }}</md-table-cell>
						<md-table-cell md-label="disciplineKPI" md-sort-by="disciplineKPI">{{ item.disciplineKPI }}</md-table-cell>
						<md-table-cell md-label="disciplineOther" md-sort-by="disciplineOther">{{ item.disciplineOther }}</md-table-cell>
						<md-table-cell md-label="rewardKPI" md-sort-by="rewardKPI">{{ item.rewardKPI }}</md-table-cell>
						<md-table-cell md-label="rewardOther" md-sort-by="rewardOther">{{ item.rewardOther }}</md-table-cell>
						<md-table-cell md-label="salaryReal" md-sort-by="salaryReal">{{ item.salaryReal }}</md-table-cell>
					</md-table-row>
				</md-table>
			</b-col>
		</b-row>
	</div>
</template>

