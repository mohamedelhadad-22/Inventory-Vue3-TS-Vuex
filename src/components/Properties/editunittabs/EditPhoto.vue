<template>
  <div class="add_photo_tab">
    <div class="tab_info">
      <h1>Photo</h1>
      <p>Upload, rearrange, or delete photos that appear in your online listings</p>
    </div>
    <hr class="hr-tabs" />
    <div class="unit_upload_image">
      <form class="uploader">
        <input
          id="file-upload"
          type="file"
          name="fileUpload"
          accept="image/*"
          @change="onFileChange"
          multiple
          :disabled="newImages.length >= 5"
        />
        <label for="file-upload" id="file-drag">
          <div>
            <div>
              <img src="@/assets/svg/Featuredicon.svg" alt="" />
            </div>
            <p>
              <span id="file-upload-btn" class="btn">Select files</span>
              <span>or drag and drop</span>
              <span class="filetype">PNG, JPG (max. 170x170px)</span>
            </p>
          </div>
        </label>
      </form>
      <div class="units-images">
        <div v-for="(image, index) in newImages" :key="index" class="unit_img_box">
          <a class="delete_img" @click="deleteImage(index)"> <deleteIcon /> </a>
          <img :src="image" alt="User Image" class="user-img" />
        </div>
        <div class="old-images">
          <div v-for="(image, index) in editingUnitImages" :key="index" class="old_img_box">
            <a class="delete_img" @click="deleteOldImage(index)"> <deleteIcon /> </a>
            <img :src="'http://192.168.100.36:8000' + image.image" alt="Old Image" />
          </div>
        </div>
      </div>
      <!-- <div v-if="uploadError" class="error-message">{{ uploadError.message }}</div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import deleteIcon from '@/assets/icons/deleteIcon.vue'
import type { PropType } from 'vue'
import type { UnitDataTableItem } from '@/models/DataTableItem'

interface ImageError {
  message: string
}

export default defineComponent({
  components: { deleteIcon },
  props: {
    editingUnitData: {
      type: Object as PropType<UnitDataTableItem>,
      required: true
    },
    originalUnitData: Object
  },
  emits: ['updateUnitImages', 'deleteOldImage'],
  data() {
    return {
      userImages: {},
      editingUnitImages: {}
    }
  },
  created() {
    this.editingUnitImages = this.editingUnitData.unit_image // Assuming unit_image holds image URLs
    console.log('editingUnitImages', this.editingUnitImages)
  },
  setup(props, { emit }) {
    const newImages = ref<string[]>([])
    const uploadError = ref<ImageError | null>(null)

    const onFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      const files: FileList | null = target.files

      if (files) {
        uploadError.value = null // Clear any previous error

        // Ensure the total number of images does not exceed 5
        const remainingSlots = 5 - newImages.value.length
        const filesToProcess = files.length > remainingSlots ? remainingSlots : files.length

        for (let i = 0; i < filesToProcess; i++) {
          const reader = new FileReader()
          reader.onloadend = () => {
            // Basic validation for image type
            if (!reader.result?.toString().startsWith('data:image')) {
              uploadError.value = { message: 'Please select only image files (PNG, JPG)' }
              return
            }
            newImages.value.push(reader.result as string)
          }
          reader.onerror = (error) => {
            console.error('Error reading file:', error)
            uploadError.value = { message: 'An error occurred while reading the file.' }
          }
          reader.readAsDataURL(files[i])
        }

        // Display a message if the user tries to upload more than 5 files
        if (files.length > remainingSlots) {
          console.warn('You can upload a maximum of 5 files.')
        }
        emit('updateUnitImages', {
          newImages: newImages.value,
          existingImages: props.editingUnitData.unit_image,
        })
      }
    }

    const deleteImage = (index: number) => {
      console.log('new images after delete', newImages)

      // Remove the image from the newImages array
      newImages.value.splice(index, 1)
      // Emit the updated list of images to the parent component
      emit('updateUnitImages', { files: newImages.value })
      console.log('new images after delete', newImages)
    }

    const deleteOldImage = (index: number): void => {
      // Emit event with the index for deletion
      emit('deleteOldImage', index)
    }

    return {
      newImages,
      onFileChange,
      deleteImage,
      deleteOldImage
    }
  }
})
</script>

<!-- <script>
// setup(props, { emit }) {
//     const newImages = ref<string[]>([])

//     const onFileChange = (event: Event) => {
//       const target = event.target as HTMLInputElement
//       const files: FileList | null = target.files

//       if (files) {
//         // Ensure the total number of images does not exceed 5
//         const remainingSlots = 5 - newImages.value.length
//         const filesToProcess = files.length > remainingSlots ? remainingSlots : files.length

//         for (let i = 0; i < filesToProcess; i++) {
//           const reader = new FileReader()
//           reader.onloadend = () => {
//             newImages.value.push(reader.result as string)
//           }
//           reader.readAsDataURL(files[i])
//         }

//         // Display a message or take action if the user tries to upload more than 5 files
//         if (files.length > remainingSlots) {
//           console.warn('You can upload a maximum of 5 files.')
//         }
//         emit('updateUnitImages', { files: newImages.value })
//       }
//     }
//     // Update the old images with the new images value

//     const deleteImage = (index: number) => {
//       console.log('new images after delete', newImages)

//       // Remove the image from the newImages array
//       newImages.value.splice(index, 1)
//       // Emit the updated list of images to the parent component
//       emit('updateUnitImages', { files: newImages.value })
//       console.log('new images after delete', newImages)
//     }

//     const deleteOldImage = (index: number): void => {
//       // Emit event with the index for deletion
//       emit('deleteOldImage', index)
//     }
//     return {
//       newImages,
//       onFileChange,
//       deleteImage,
//       deleteOldImage
//     }
//   }
</script> -->

<style scoped>
.add_photo_tab {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
}
.unit_upluade_imge {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 16px;
  flex-direction: column;
}
.unit_upload_image {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 16px;
  flex-direction: column;
}
.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.old-images,
.units-images {
  width: 100%;
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
}
.old_img_box,
.unit_img_box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  /* flex: 2; */
  border: 1px solid #d0d5dd;
  position: relative;
  margin: 5px;
  width: 31%;
  min-height: 150px;
}
.delete_img {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  border-radius: 4px;
  background: #fee4e2;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  width: 26px;
  height: 26px;
  justify-content: center;
  align-items: center;
}
.old_img_box img,
.unit_img_box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #d0d5dd;
  /* background: url(<path-to-image>), lightgray 50% / cover no-repeat; */
}
.uploader {
  display: flex;
  gap: 16px;
  width: 100%;
  margin-bottom: 16px;
}
.uploader label {
  width: 100%;
  padding: 2rem 1.5rem;
  text-align: center;
  border-radius: 4px;
  border: 2px solid #e3e5f6;
  background: #fff;
  transition: all 0.4s ease;
  user-select: none;
}
.uploader label:hover {
  border-color: #454cad;
}
.uploader label.hover {
  border: 3px solid #454cad;
  box-shadow: inset 0 0 0 6px #eee;
}
.uploader #file-image.hidden {
  display: none;
}

.uploader input[type='file'] {
  display: none;
}

.uploader .btn {
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  padding: 0 1rem;
  color: var(--Main-background-color);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.uploader .filetype {
  display: block;
}
.photo_action {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: auto;
  transition: all 0.5s ease-in-out;
}
.save_photo {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #5757bc;
  background: #5757bc;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  padding: 12px 18px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
</style>
<style>
.hr-tabs {
  border: 0;
  border-top: 1px solid #e3e5f6;
  margin: 16px 0;
  width: 100%;
}
</style>
