<template>
  <div class="flight-route-container">
    <div class="flight-carrier">
      <img
        :src="`https://aviata.kz/static/airline-logos/21x21/${route.carrierCode}.png`"
        :alt="route.carrierName"
        width="21"
        height="21"
      />
      <strong class="text-s ml-3 flight-carrier-name">
        {{ route.carrierName }}
      </strong>
      <div class="luggage-phone ml-auto text-xs">{{ luggageString }}</div>
    </div>

    <div class="d-flex flex-column flight-departure">
      <span class="text-xs">
        {{ route.depDate }}
      </span>
      <span class="text-xl weight-600">
        {{ route.depTime }}
      </span>
    </div>

    <div class="d-flex flex-column flex-grow flight-segments">
      <div class="d-flex justify-between">
        <span class="gray-1 text-xxs">{{ codes.origin }}</span>
        <span class="text-xs">{{ route.traveltime }}</span>
        <span class="gray-1 text-xxs">{{ codes.destination }}</span>
      </div>
      <div class="stepper">
        <template v-for="(step, index) in steps - 1" class="d-flex">
          <svg
            :key="`step-${index}`"
            width="6"
            height="6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="2.5" fill="none" stroke="#B9B9B9" />
          </svg>
          <hr
            :key="`segment-${index}`"
            class="line"
            v-if="index != steps - 1"
          />
        </template>
        <div class="last-step">
          <svg
            width="6"
            height="6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="wtf"
          >
            <circle cx="3" cy="3" r="2.5" fill="none" stroke="#B9B9B9" />
          </svg>
        </div>
      </div>
      <span class="warning text-xs text-center" v-if="this.segments.length > 1">
        {{ route.stopsString }}
      </span>
    </div>

    <div class="d-flex flex-column flight-arrival">
      <span class="text-xs">
        {{ route.arrDate }}
      </span>
      <span class="text-xl weight-600">
        {{ route.arrTime }}
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    route: Object,
    luggageString: String,
  },
  data() {
    return {};
  },
  mounted() {
    // console.log("Flight info: ", this.route);
  },
  computed: {
    codes() {
      return {
        origin: this.segments[0].origin_code,
        destination: this.segments.at(-1).dest_code,
      };
    },
    segments() {
      return this.route.segments;
    },
    steps() {
      return this.segments.length + 1;
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMM, dd").toLowerCase().replace(".", "");
    },
    formatTime(date) {
      return moment(date).format("kk:mm");
    },
  },
};
</script>

<style lang="scss" scoped>
.flight-route-container {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 40% 1fr;
  grid-template-rows: auto;
  grid-template-areas: "flight-carrier flight-departure flight-segments flight-arrival";
  gap: 1rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: auto auto 30% auto;
  }

  @media (max-width: 800px) {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    gap: 1.75rem;
    grid-template-areas:
      "flight-carrier flight-carrier flight-carrier"
      "flight-departure flight-segments flight-arrival";
    // "flight-segments flight-segments flight-segments";
  }

  @media (max-width: 400px) {
    // grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "flight-carrier flight-carrier flight-carrier"
      "flight-departure . flight-arrival"
      "flight-segments flight-segments flight-segments";
    // gap: 1.75rem;
  }
}

.flight-carrier {
  grid-area: flight-carrier;
  display: flex;
  align-items: center;

  .luggage-phone {
    @media (min-width: 600px) {
      display: none;
    }
  }
}
.flight-departure {
  grid-area: flight-departure;
}
.flight-segments {
  grid-area: flight-segments;
  align-self: start;
  padding-top: 0.1rem;
  justify-content: space-between;

  @media (max-width: 400px) {
    height: 5rem;
  }
}
.flight-arrival {
  grid-area: flight-arrival;
}
.stepper {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  .step {
    display: flex;
    justify-content: space-between;
  }
}

.last-step {
  display: flex;
}

.line {
  flex: 1 1 0px;
  height: 0;
  max-height: 0;
  border: solid #b9b9b9;
  border-width: thin 0 0 0;
  // transition: inherit;
  // align-self: center;
  margin: 0;
}
</style>
