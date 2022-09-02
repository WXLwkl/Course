<template>
    <div class="search">
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">                
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <input type="text" placeholder="易经" v-model="searchKey" @keydown.enter="enterKey">
        </div>
    </div>
</template>

<style lang="less" scoped>
.search {
    .searchTop{
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    input {
        width: 90%;
        margin-left: .2rem;
        border: none;
        border-bottom: 1px solid #999;
        padding: 00.1rem;
    }
}
}
</style>