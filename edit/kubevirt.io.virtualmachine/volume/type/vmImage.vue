<script>
import UnitInput from '@/components/form/UnitInput';
import LabeledInput from '@/components/form/LabeledInput';
import LabeledSelect from '@/components/form/LabeledSelect';
import { IMAGE } from '@/config/types';
import { _CREATE, _EDIT } from '@/config/query-params';

export default {
  name:       'VmImage',
  components: {
    UnitInput, LabeledInput, LabeledSelect
  },
  props: {
    value: {
      type:    Object,
      default: () => {
        return {};
      }
    },

    typeOption: {
      type:    Array,
      default: () => {
        return [];
      }
    },

    storageOption: {
      type:    Array,
      default: () => {
        return [];
      }
    },

    interfaceOption: {
      type:    Array,
      default: () => {
        return [];
      }
    },

    bootOrderOption: {
      type:    Array,
      default: () => {
        return [];
      }
    },
    accessModeOption: {
      type:    Array,
      default: () => {
        return [];
      }
    },
    volumeModeOption: {
      type:    Array,
      default: () => {
        return [];
      }
    },
    mode: {
      type:    String,
      default: 'create'
    },
    idx: {
      type:     Number,
      required: true
    }
  },

  computed: {
    isCreate() {
      return this.mode === _CREATE;
    },
    disabledImageVolume() {
      return this.idx === 0;
    },
    imagesOption() {
      const choise = this.$store.getters['cluster/all'](IMAGE);

      return choise.map( (I) => {
        return {
          label: I.spec.displayName,
          value: I.spec.displayName
        };
      });
    },
    isDisabled() {
      return !this.value.newCreateId && this.mode === _EDIT;
    }

  },

  watch: {
    'value.type'(neu) {
      if (neu === 'cd-rom') {
        this.$set(this.value, 'bus', 'sata');
        this.update();
      }
    },
  },

  methods: {
    update() {
      this.$emit('update');
    }
  }
};
</script>

<template>
  <div @input="update">
    <div class="row mb-20">
      <div class="col span-6">
        <LabeledInput v-model="value.name" :label="t('harvester.fields.name')" required :mode="mode" :disabled="isDisabled" />
      </div>

      <div class="col span-6">
        <LabeledSelect
          v-model="value.type"
          :label="t('harvester.fields.type')"
          :options="typeOption"
          :mode="mode"
          :disabled="isDisabled"
          @input="update"
        />
      </div>
    </div>

    <div class="row mb-20">
      <div class="col span-6">
        <LabeledSelect
          v-model="value.image"
          :disabled="disabledImageVolume || isDisabled"
          :label="t('harvester.fields.image')"
          :options="imagesOption"
          :mode="mode"
          @input="update"
        />
      </div>

      <div class="col span-6">
        <UnitInput v-model="value.size" :label="t('harvester.fields.size')" :mode="mode" suffix="GiB" :disabled="isDisabled" />
      </div>
    </div>

    <div class="row mb-20">
      <div class="col span-3">
        <LabeledSelect
          v-model="value.bus"
          :label="t('harvester.vmPage.volume.bus')"
          :mode="mode"
          :options="interfaceOption"
          :disabled="isDisabled"
          @input="update"
        />
      </div>

      <div class="col span-3">
        <LabeledSelect
          v-model="value.bootOrder"
          :label="t('harvester.vmPage.volume.bootOrder')"
          :mode="mode"
          :disabled="isDisabled"
          :searchable="false"
          :options="bootOrderOption"
          @input="update"
        />
      </div>

      <!-- <div class="col span-6">
        <LabeledSelect
          v-model="value.volumeMode"
          label="Volume Mode"
          :mode="mode"
          class="mb-20"
          :options="volumeModeOption"
          @input="update"
        />
      </div> -->
    </div>
  </div>
</template>
