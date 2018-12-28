<style src="./Dachsachkyluat.scss" module lang="scss"></style>
<script src="./Dachsachkyluat.js"></script>

<template>
	<div>
		<b-row>
			<b-col class="text-right">
				 <b-button  variant="warning" @click="taomoi('taomoi')">
              		  Tạo mới
           		 </b-button>
					<b-button  variant="danger" @click="exportTableToExcel('tableKt','danh sach khen thuong')">
              		  Export
           		 </b-button>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<md-table v-model="users" md-sort="name" md-sort-order="asc" md-card md-fixed-header class="tablekt" id="tableKt">
				<md-table-toolbar >
					<md-field md-clearable class="md-toolbar-section-end">
					<md-input
						placeholder="Search by name..."
						v-model="search"
						@input="searchOnTable"/>
					</md-field>
				</md-table-toolbar>
				<md-table-row slot="md-table-row" slot-scope="{ item }">
					<md-table-cell md-label="STT" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
					<md-table-cell md-label="Tên nhân viên" md-sort-by="title">{{ item.title }}</md-table-cell>
					<md-table-cell md-label="Phòng ban" md-sort-by="title">{{ item.title }}</md-table-cell>
					<md-table-cell md-label="Ngày có hiệu lực" md-sort-by="title">{{ item.title }}</md-table-cell>
					<md-table-cell md-label="Tên khen thưởng" md-sort-by="name">{{ item.name }}</md-table-cell>
					<md-table-cell md-label="Hình thức khen thưởng" md-sort-by="email">{{ item.email }}</md-table-cell>
					<md-table-cell md-label="Số tiền thưởng" md-sort-by="gender">{{ item.gender }}</md-table-cell>
					<md-table-cell md-label="Ghi chú" md-sort-by="title">{{ item.title }}</md-table-cell>
				</md-table-row>
			</md-table>
		</b-row>
		<br>
	</div>
</template>

