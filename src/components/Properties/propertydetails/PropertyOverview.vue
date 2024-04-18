<template>
  <div class="property_overview">
    <div class="overview_content">
      <h1>Property Overview</h1>
    </div>
    <div class="quick_actions">
      <h1>Quick Actions</h1>
      <div class="action-row">
        <div class="Unite">
          <div class="action_icon">
            <UnitIcon />
          </div>
          <button class="btn-primary">Add Unite</button>
        </div>
        <div class="leases">
          <div class="action_icon">
            <LeasesIcon />
          </div>
          <button class="btn-primary">Add leases</button>
        </div>
      </div>
      <div class="action-row">
        <div class="Application">
          <div class="action_icon">
            <ApplicationIcon />
          </div>
          <button class="btn-primary">Add Application</button>
        </div>
        <div class="Document">
          <div class="action_icon">
            <DocumentIcon />
          </div>
          <button class="btn-primary">Add Document</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UnitIcon from '@/assets/icons/UnitIcon.vue'
import LeasesIcon from '@/assets/icons/LeasesIcon.vue'
import ApplicationIcon from '@/assets/icons/ApplicationIcon.vue'
import DocumentIcon from '@/assets/icons/DocumentsIcon.vue'
export default {
  name: 'PropertyOverview',
  components: {
    UnitIcon,
    LeasesIcon,
    DocumentIcon,
    ApplicationIcon
  }
}
</script>

<style scoped>
.property_overview {
  display: flex;
  gap: 20px;
  padding: 16px;
  width: 100%;
}
.overview_content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.overview_content h1 {
  color: #101828;
  font-size: 24px;
  font-weight: 600;
}
.quick_actions {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* flex-wrap: wrap; */
  gap: 8px;
  width: 30%;
}
.quick_actions h1 {
  color: #101828;
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  flex-shrink: 1;
}
.action-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.action_icon {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #f3f3fb;
}
.Unite,
.leases,
.Application,
.Document {
  display: flex;
  padding: 14px;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  flex: 1 0 0;
  border-radius: 4px;
  border: 1px solid #ced3ef;
  background: #fff;
}
.Unite svg,
.leases svg,
.Application svg,
.Document svg {
  width: 20px;
  height: 20px;
}
.Unite button,
.leases button,
.Application button,
.Document button {
  width: 100%;
  font-size: 12px;
  color: #fff;
}
</style>

<style>
.Unite svg path,
.leases svg path,
.Application svg path,
.Document svg path {
  /* fill: #5757BC; */
  stroke: #5757bc;
}
</style>
