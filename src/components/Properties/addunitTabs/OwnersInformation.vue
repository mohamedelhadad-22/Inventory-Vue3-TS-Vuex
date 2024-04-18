<template>
  <div class="OwnersInformation">
    <div class="tab_info">
      <h1>Owners Information</h1>
      <p>Enter the owner's information for this unit</p>
    </div>
    <hr class="hr-tabs" />
    <div class="add_unit_owner">
      <div class="owner_box">
        <AddNewIcon />
        <h2>Add Owner</h2>
      </div>

      <div class="owners_list">
        <div class="owners-table">
          <div class="row header">
            <div class="cell unit_header">
              <span>name</span>
            </div>
            <div class="cell">
              <span>phone</span>
            </div>
            <div class="cell">
              <span>email</span>
            </div>
          </div>

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
              <div class="phone_info">
                <PhoneIcon />
                <span>05123456789</span>
              </div>
            </div>
            <div class="cell">
              <EmailIcon />
              <span>olivia@untitledui.com</span>
            </div>
          </div>
          <div class="row">
            <div class="cell owner_info">
              <div class="owner_icon">
                <UserIcon />
              </div>
              <div class="owner_name">
                <span>Zaid ZaZa</span>
                <div class="badg">
                  <span>owner</span>
                </div>
              </div>
            </div>
            <div class="cell specs">
              <div class="phone_info">
                <PhoneIcon />
                <span>05123456789</span>
              </div>
            </div>
            <div class="cell">
              <EmailIcon />
              <span>phox@untitledui.com</span>
            </div>
          </div>
          <div class="row">
            <div class="cell owner_info">
              <div class="owner_icon">
                <UserIcon />
              </div>
              <div class="owner_name">
                <span>Caitlyn King</span>
                <div class="badg">
                  <span>owner</span>
                </div>
              </div>
            </div>
            <div class="cell specs">
              <div class="phone_info">
                <PhoneIcon />
                <span>05123456789</span>
              </div>
            </div>
            <div class="cell">
              <EmailIcon />
              <span>Add Email Address</span>
            </div>
          </div>
          <div class="row page_pagination">
            <ul class="pagination">
              <li class="page-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M4.66797 10.1114H16.3346M16.3346 10.1114L10.5013 4.27808M16.3346 10.1114L10.5013 15.9447"
                    stroke="#5757BC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </li>
              <li class="page-item">1</li>
              <li class="page-item">2</li>
              <li class="page-item">3</li>
              <li class="page-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M16.3346 10.1114H4.66797M4.66797 10.1114L10.5013 15.9447M4.66797 10.1114L10.5013 4.27808"
                    stroke="#5757BC"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </li>
            </ul>
          </div>
          <!-- Add more rows as needed -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AddNewIcon from '@/assets/icons/AmenitiesIcon/AddNewIcon.vue'
import UserIcon from '@/assets/icons/UserIcon.vue'
import PhoneIcon from '@/assets/icons/PhoneIcon.vue'
import EmailIcon from '@/assets/icons/EmailIcon.vue'
export default {
  name: 'OwnersInformation',
  components: {
    AddNewIcon,
    PhoneIcon,
    UserIcon,
    EmailIcon
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
.OwnersInformation {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.add_unit_owner {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.owner_box {
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 4px;
  border: 1px dashed #ced3ef;
  background: #fff;
  cursor: pointer;
}
.owner_box h2 {
  margin-top: 16px;
  font-size: 14px;
  font-weight: 600;
  color: #5757bc;
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
}
.row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eaecf0;
  /* padding: 8px; */
}
.row.header {
  background-color: #f2f4f7;
}
.header .cell span {
  font-weight: bold;
  color: #5757bc;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

.cell {
  flex: 1;
  border-left: 1px solid #eaecf0;
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
}
.page_pagination {
  display: flex;
  padding: 5px 0px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 0px 0px 4px 4px;
  border: 1px solid #eaecf0;
  background: #f2f4f7;
}
.pagination {
  display: flex;
  align-items: center;
}
.pagination .page-item {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  color: #5757bc;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin: 2px;
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
.owner_name{
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
</style>
