<style lang="scss">
@import './ModalRegister.scss';</style>
<script src="./ModalRegister.js"></script>

<template>
    <div class="modal-mask roboto" @click="close" v-show="show">
        <div class="modal-container" @click.stop>
            <div class="modal-body">
                <b-row>
                    <b-col md="3" style="" >
                        <LeftNavBar
                            @currentViewUpdate="currentView=$event"></LeftNavBar>

                    </b-col>
                    <b-col>
                        <keep-alive>
                            <component :is="currentView" ></component>
                        </keep-alive>

                    </b-col>
                </b-row>
            </div>
            <!-- <div class="modal-footer">
                <FooterAll></FooterAll>
            </div> -->
        </div>
    </div>
</template>




