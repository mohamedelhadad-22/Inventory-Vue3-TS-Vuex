<!-- <template>
  <router-link
    :to="link.path"
    exact
    active-class="active"
    :key="link.index"
  >
    <SvgIcon :name="link.icon as string" />
    {{ link.name }}
  </router-link>


</template>

<script lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'

import type {linkObject} from '@/models/linkObject'

export default {
  components: {
    SvgIcon
  },
  props: {
    link: {
      type: Object as () => linkObject,
      required: true
    }
  },
  methods: {
  },

}
</script> -->

<template>
    <div>
        <router-link v-if="isLinkObject(link)" :to="link.path" exact active-class="active" :key="link.index">
            <SvgIcon :name="link.icon as string" />
            {{ link.name }}
        </router-link>

        <div v-else-if="isLinkList(link)">
            <div v-for="(subLink, index) in link.links" :key="index">
                <router-link :to="subLink.path" exact active-class="active" :key="subLink.index">
                    <SvgIcon :name="subLink.icon as string" />
                    {{ subLink.name }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import SvgIcon from "../SvgIcon.vue"
import type { linkObject, linkList } from "@/models/linkObject"

export default {
    components: {
        SvgIcon,
    },
    props: {
        link: {
            type: [Object, Array] as unknown as () => linkObject | linkList,
            required: true,
        },
    },
    methods: {
        isLinkObject(item: linkObject | linkList): item is linkObject {
            return "name" in item
        },
        isLinkList(item: linkObject | linkList): item is linkList {
            return "links" in item
        },
    },
}
</script>

<style scoped>
a {
    display: flex;
    font-size: 16px;
    text-align: left;
    color: #e3e5f6;
    padding: 12px;
    margin-bottom: 6px;
    width: 100%;
    transition: all 0.5s ease-in-out;
    border-radius: 8px;
    font-weight: 500;
    flex-wrap: nowrap;
    align-items: center;
}
.svg-icon {
    margin-right: 4px;
    width: 26px;
    height: 26px;
}
.svg-icon path {
    transition: all 0.5s ease-in-out;
    border: #fff;
}
a:hover {
    background-color: var(--Main-background-color);
    color: #fff;
}

a:hover .svg-icon path {
    stroke: #fff;
}
.active {
    background-color: var(--Main-background-color);
    color: #fff !important;
}
.active svg path {
    stroke: #fff;
}
</style>
