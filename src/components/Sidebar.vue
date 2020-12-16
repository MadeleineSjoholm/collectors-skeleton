<!--<template>
  <div class="container" :class="{ show: showSidebar }">
    <div class="control">
      <i class="fas fa-angle-double-right" @click="showNav"></i>
    </div>
    <div class="navigation-icons">
      <i class="fas fa-home"></i>
      <i class="fas fa-camera-retro"></i>
      <i class="fas fa-user-circle"></i>
      <i class="fas fa-info-circle"></i>
    </div>
    <div class="navigation-links">
      <transition-group name="fade">
        <div v-show="showLink" key="1">Home</div>
        <div v-show="showLink" key="2">Game Rules</div>
        <div v-show="showLink" key="3">Invite Players</div>
        <div v-show="showLink" key="4">Exit Game</div>
        <div v-show="showLink" key="5">Fake more money</div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
    data: () => {
        return {
            showSidebar: false,
            showLink: false
        }
    },
    methods: {
        showNav() {
            if(this.showSidebar) {
                this.showLink = false;
                setTimeout(() => {
                    this.showSidebar = false;
                }, 500);
            } 
            else {
this.showSidebar = true;
 setTimeout(() => {
                    this.showSidebar = false;
                }, 500);
            }
        }
        }
    }
</script>

<style scoped>
.container {
	 position: absolute;
	 top: 0;
	 left: 0;
	 width: 50px;
	 padding: 10px;
	 min-height: calc(100vh - 20px);
	 background-color: rgba(129, 177, 33, 0.8);
	 border: solid #fff;
	 border-width: 0 0 0 1px;
	 z-index: 999;
	 transition: all 0.5s ease-in-out;
}
 .container .control {
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 width: 50px;
	 margin-bottom: 10px;
}
 .container .control i {
	 font-size: 2rem;
	 cursor: pointer;
	 transition: all 0.5s ease-in-out;
}
 .container.show {
	 width: 180px;
}
 .container.show .control > i {
	 color: #fff;
	 transform: rotateZ(-180deg);
}
 .container.show .navigation-icons {
	 color: #fff;
}
 .container .navigation-icons {
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 flex-direction: column;
	 width: 50px;
	 float: left;
}
 .container .navigation-icons i {
	 font-size: 2rem;
	 padding: 10px 0;
	 cursor: pointer;
	 transition: all 0.5s ease-in-out;
}
 .container .navigation-icons i:hover {
	 color: #fff;
}
 .container .navigation-links {
	 padding-top: 14px;
	 float: left;
}
 .container .navigation-links div {
	 font-size: 1.35rem;
	 padding-left: 10px;
	 margin-bottom: 18px;
	 cursor: pointer;
}
 .container .navigation-links div:hover {
	 color: #fff;
}
 .fade-enter-active:nth-child(1), .fade-leave-active:nth-child(1) {
	 transform: linear calc(.1s * 1), display 0.5s;
}
 .fade-enter-active:nth-child(2), .fade-leave-active:nth-child(2) {
	 transform: linear calc(.1s * 2), display 0.5s;
}
 .fade-enter-active:nth-child(3), .fade-leave-active:nth-child(3) {
	 transform: linear calc(.1s * 3), display 0.5s;
}
 .fade-enter-active:nth-child(4), .fade-leave-active:nth-child(4) {
	 transform: linear calc(.1s * 4), display 0.5s;
}
 .fade-enter-active:nth-child(5), .fade-leave-active:nth-child(5) {
	 transform: linear calc(.1s * 5), display 0.5s;
}
 .fade-enter, .fade-leave-to {
	 transform: scale(0);
}
</style>

-->