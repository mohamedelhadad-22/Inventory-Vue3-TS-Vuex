<template>
  <div class="edit_OwnersInformation">
    <div class="tab_info">
      <h1>Ownership</h1>
      <p>Add or change property settings</p>
    </div>
    <hr class="hr-tabs" />
    <div class="edit_property_owner">
      <div class="owners_list">
        <div class="owners-table">
          <div class="row">
            <div class="cell owner_info">
              <div class="owner_icon">
                <UserIcon />
              </div>
              <div class="owner_name">
                <span>Ali Mohammed</span>
                <div class="badg">
                  <span>owner</span>
                </div>
              </div>
            </div>
            <div class="cell specs">
              <div class="email_info">
                <EmailIcon />
                <span>kate@untitledui.com</span>
              </div>
            </div>
          </div>
          <!-- Add more rows as needed -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserIcon from '@/assets/icons/UserIcon.vue'
import EmailIcon from '@/assets/icons/EmailIcon.vue'
export default {
  name: 'EditOwnersInformation',
  components: {
    UserIcon,
    EmailIcon
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
.edit_OwnersInformation {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.edit_property_owner {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.owners_list {
  width: 100%;
  display: flex;
}
.owners-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #eaecf0;
  border-radius: 4px;
}
.row {
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  background: #f2f4f7;
  border: 1px solid #d0d5dd;
}
.cell {
  flex: 1;
  border-left: 1px solid #d0d5dd;
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
}
.owner_icon {
  width: 40px;
  height: 40px;
  background-color: #d0d5dd;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 12px;
}
.owner_name {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.owner_info {
  display: flex;
  align-items: center;
}
.owner_info span {
  font-size: 0.875rem;
  font-weight: 500;
  color: #101828;
}
.badg {
  margin-top: 4px;
  border-radius: 16px;
  border: 1px solid #abefc6;
  background: #ecfdf3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.badg span {
  color: #067647;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
}
.email_info {
  display: flex;
  gap: 6px;
  align-items: center;
}
</style>
