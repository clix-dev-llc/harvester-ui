<script>
export default {
  props: {
    value: {
      type:     [String, Number, Boolean, Object],
      required: true,
    },

    inactiveClass: {
      type:    String,
      default: 'bg-disabled',
    },

    activeClass: {
      type:    String,
      default: 'bg-primary',
    },

    options: {
      type:     Array,
      required: true,
    },

    labelsAreTranslations: {
      type:    Boolean,
      default: false
    }
  },

  computed: {
    optionObjects() {
      const value = this.value;

      return this.options.map((opt) => {
        let out;

        if ( opt && typeof opt === 'object' && typeof opt.value !== 'undefined' ) {
          out = Object.assign({}, opt);
        } else {
          out = { label: opt, value: opt };
        }

        const active = value === out.value;

        out.class = {
          btn:                  true,
          [this.inactiveClass]: !active,
          [this.activeClass]:   active,
        };

        return out;
      });
    },
  },

  methods: {
    change(value) {
      this.$emit('input', value);
    }
  }
};
</script>

<template>
  <div v-trim-whitespace class="btn-group">
    <button
      v-for="(opt,idx) in optionObjects"
      :key="idx"
      type="button"
      :class="opt.class"
      class="btn-sm"
      @click="change(opt.value)"
    >
      <slot name="option" :label="opt.label" :value="opt.value">
        <i v-if="opt.icon" :class="{icon: true, [opt.icon]: true}" />
        <t v-if="opt.label && labelsAreTranslations" :k="opt.label" />
        <span v-else-if="opt.label">{{ opt.label }}</span>
      </slot>
    </button>
  </div>
</template>
