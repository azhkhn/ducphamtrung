<style lang="scss">
	@import './BtnCart.scss';
</style>
<script src="./BtnCart.js"></script>
<template>
    <div @click="eventBtn" :id="position + '-wrapper'" class="fab-wrapper"
         :style="[ pos, {zIndex: zIndex}, {position: positionType} ]">
        <div :id="position + '-action'" class="actions-container" :style="listPos">
            <transition name="fab-actions-appear"
                        :enter-active-class="transitionEnter"
                        :leave-active-class="transitionLeave"
            >
                <ul v-show="toggle" class="fab-list">
                    <template v-for="action in actions">
                        <transition
                                enter-active-class="animated quick zoomIn"
                                leave-active-class="animated quick zoomOut"
                        >
                            <template v-if="action.tooltip">
                                <li v-if="toggle" :style="{ 'background-color': action.color || bgColor }"
                                    v-tooltip="{ content: action.tooltip, placement: tooltipPosition, classes: 'fab-tooltip', trigger: tooltipTrigger}"
                                    @click="toParent(action.name)" class="pointer"
                                    ref="actions">
                                    <i :class="[ actionIconSize ,'material-icons']">{{action.icon}}</i>
                                </li>
                            </template>
                            <template v-else>
                                <li v-if="toggle" :style="{ 'background-color': action.color || bgColor }"
                                    @click="toParent(action.name)" class="pointer">
                                    <i :class="[ actionIconSize ,'material-icons']">{{action.icon}}</i>
                                </li>
                            </template>
                        </transition>
                    </template>
                </ul>
            </transition>
        </div>
        <template v-if="rippleShow">
            <template v-if="mainTooltip">
                <div v-ripple="rippleColor == 'light' ? 'rgba(255, 255, 255, 0.35)' : ''" @click="toggle = !toggle"
                     v-tooltip="{ content: mainTooltip, placement: tooltipPosition, classes: 'fab-tooltip' }"
                     class="fab-main pointer" :style="{ 'background-color': bgColor, 'padding': paddingAmount }">
                    <i :class="[ mainIconSize , { rotate: toggle } ,'material-icons main']"><icon :name="mainIcon" scale="1.5" style="color: white"></icon><span class="borderCart">{{indexCart}}</span></i>
                    <i :class="[ mainIconSize , { rotate: toggle } ,'material-icons close']"><icon :name="mainIcon" scale="1.5" style="color: white"></icon><span class="borderCart">{{indexCart}}</span></i>
                </div>
            </template>
            <template v-else>
                <div v-ripple="rippleColor == 'light' ? 'rgba(255, 255, 255, 0.35)' : ''" @click="toggle = !toggle"
                     class="fab-main pointer" :style="{ 'background-color': bgColor, 'padding': paddingAmount }"
                >
                    <i :class="[ mainIconSize , { rotate: toggle }, 'material-icons main']"><icon :name="mainIcon" scale="1.5" style="color: white"></icon><span class="borderCart">{{indexCart}}</span></i>
                    <i :class="[ mainIconSize , { rotate: toggle }, 'material-icons close']"><icon :name="mainIcon" scale="1.5" style="color: white"></icon><span class="borderCart">{{indexCart}}</span></i>
                </div>
            </template>
        </template>
        <template v-else>
            <template v-if="mainTooltip">
                <div v-bind:v-tooltip="{ content: mainTooltip, placement: tooltipPosition, classes: 'fab-tooltip'}"
                     class="fab-main pointer" :style="{ 'background-color': bgColor, 'padding': paddingAmount }"
                >
                    <i class="material-icons md-36 main" :class="{ rotate: toggle }"><icon :name="mainIcon" scale="1.5" style="color: white"></icon><span class="borderCart">{{indexCart}}</span></i>
                    <i class="material-icons md-36 close" :class="{ rotate: toggle }"><icon :name="mainIcon" scale="1.5" style="color: white"></icon><span class="borderCart">{{indexCart}}</span></i>
                </div>
            </template>
            <template v-else>
                <div class="fab-main pointer" :style="{ 'background-color': bgColor, 'padding': paddingAmount }"
                >
                    <i class="material-icons md-36 main" :class="{ rotate: toggle }"><icon :name="mainIcon" scale="1.5" style="color: white"></icon><span class="borderCart">{{indexCart}}</span></i>
                    <i class="material-icons md-36 close" :class="{ rotate: toggle }"><icon :name="mainIcon" scale="1.5" style="color: white"></icon><span class="borderCart">{{indexCart}}</span></i>
                </div>
            </template>
        </template>
    </div>
</template>


