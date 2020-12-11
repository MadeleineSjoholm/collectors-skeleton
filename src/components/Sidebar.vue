<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        data: () => ({
            isPanelOpen: true
        }),
        methods: {
            closeSidebarPanel() {
                this.isPanelOpen = false
            }
        }
    }
</script>
<style>
    .slide-enter-active,
    .slide-leave-active
    {
        transition: transform 0.2s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(-100%);
        transition: all 150ms ease-in 0s
    }

    .sidebar-backdrop {
        background-color: rgba(0,0,0,.5);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        cursor: pointer;
    }

    .sidebar-panel {
        overflow-y: auto;
        background-color: #130f40;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 999;
        padding: 3rem 20px 2rem 20px;
        width: 300px;
    }
</style>


<template>
    <div id="info"
         :class="{ 'active' : isInfoActive }"
         @click.prevent="toggle">
        <slot>
            <button type="button" class="info-button" title="Menu">
                <span class="info-bar info-bar--1"></span>
                <span class="info-bar info-bar--2"></span>
                <span class="info-bar info-bar--3"></span>
            </button>
        </slot>
    </div>
</template>
<script>
    export default {
        data: () => ({
            isInfoActive: false
        }),
        methods: {
            toggle() {
                this.isInfoActive = !this.isInfoActive
            }
        }
    }
</script>
<style>
   .hidden {
        visibility: hidden;
    }

    button {
        cursor: pointer;
    }

    /* remove blue outline */
    button:focus {
        outline: 0;
    }

    .info-button {
        position: relative;
        height: 30px;
        width: 32px;
        display: block;
        z-index: 999;
        border: 0;
        border-radius: 0;
        background-color: transparent;
        pointer-events: all;
        transition: transform .6s cubic-bezier(.165,.84,.44,1);
    }

    .info-bar {
        background-color: #130f40;
        position: absolute;
        top: 50%;
        right: 6px;
        left: 6px;
        height: 2px;
        width: auto;
        margin-top: -1px;
        transition: transform .6s cubic-bezier(.165,.84,.44,1),opacity .3s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1);
    }

    .info-bar--1 {
        -webkit-transform: translateY(-6px);
        transform: translateY(-6px);
    }

    .info-bar--2 {
        transform-origin: 100% 50%;
        transform: scaleX(.8);
    }

    .info-button:hover .info-bar--2 {
        transform: scaleX(1);
    }

    .no-touchevents .info-bar--2:hover {
        transform: scaleX(1);
    }

    .info-bar--3 {
        transform: translateY(6px);
    }

    #info.active .info-button {
        transform: rotate(-180deg);
    }

    #info.active .info-bar {
        background-color: #fff;
    }

    #info.active .info-bar--1 {
        transform: rotate(45deg)
    }

    #info.active .info-bar--2 {
        opacity: 0;
    }

    #info.active .info-bar--3 {
        transform: rotate(-45deg)
    }
</style>