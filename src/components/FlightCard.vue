<template>
  <div class="flight-card">
    <div class="flight-card-route">
      <div class="d-flex align-center temp">
        <FlightRoute :route="formattedData" class="flight-route-stepper" />
      </div>
      <div class="d-flex flight-conditions">
        <a class="button-link mr-5">Детали перелета</a>
        <a class="button-link mr-5">Условия тарифа</a>
        <span v-if="!details.refundable" class="gray-2 d-flex align-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.62478 4.63247L2.18383 5.00014L2 3.77966L5.66142 3.22817L6.21291 6.88958L4.99244 7.07341L4.62478 4.63247Z"
              fill="#707276"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.50024 3.53116C3.45478 4.96007 2.1168 7.33198 2.1168 10.0164C2.1168 14.3825 5.65618 17.9218 10.0222 17.9218C14.3883 17.9218 17.9277 14.3825 17.9277 10.0164C17.9277 5.66297 14.4087 2.13144 10.0601 2.11105L10.035 3.11098C13.8429 3.11789 16.9277 6.2069 16.9277 10.0164C16.9277 13.8302 13.836 16.9218 10.0222 16.9218C6.20847 16.9218 3.1168 13.8302 3.1168 10.0164C3.1168 7.82671 4.13598 5.87507 5.72584 4.60995L5.50024 4.61576V3.99864V3.53116Z"
              fill="#707276"
            />
            <path
              d="M1.64918 16.7664L1.2933 17.1176L1.64451 17.4735L2.51148 18.352L2.86269 18.7078L3.21857 18.3566L18.2986 3.47419L18.6545 3.12298L18.3032 2.7671L17.4363 1.88863L17.0851 1.53275L16.7292 1.88397L1.64918 16.7664Z"
              fill="#707276"
              stroke="white"
            />
          </svg>
          <span class="ml-1">невозвратный</span>
        </span>
      </div>
    </div>
    <div class="flight-card-info">
      <strong class="text-center">{{ details.price }} ₸</strong>
      <Button class="button-action mt-3" @click="test(details.price)">
        Выбрать
      </Button>
      <span class="text-xs gray-2 mt-2 text-center">
        Цена за всех пассажиров
      </span>
      <span class="text-xxs">
        {{ luggageString(Object.values(details.services)[0]) }}
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import Button from "@/components/ui/Button.vue";
import FlightRoute from "@/components/FlightRoute.vue";

export default {
  props: {
    details: Object,
  },
  components: { Button, FlightRoute },
  computed: {
    itinerary() {
      return this.details.itineraries[0][0];
    },
    formattedData() {
      return {
        arrDate: this.formatDate(this.itinerary.arr_date),
        arrTime: this.formatTime(this.itinerary.arr_date),
        depDate: this.formatDate(this.itinerary.dep_date),
        depTime: this.formatTime(this.itinerary.dep_date),
        stopsString: this.stops,
        traveltime: this.calcDuration(this.itinerary.traveltime),
        carrierName: this.itinerary.carrier_name,
        carrierCode: this.details.validating_carrier,
        segments: [...this.itinerary.segments],
      };
    },
    stops() {
      let segments = this.itinerary.segments;
      if (segments.length === 1) return;

      let result = "через ";

      for (let i = 0; i < segments.length - 1; i++) {
        const segmentStart = segments[i];
        const segmentDest = segments[i + 1];

        const a = moment(segmentDest.dep_time_iso);
        const b = moment(segmentStart.arr_time_iso);

        const waitTime = a.diff(b, "seconds");

        result += `${segmentStart.dest}, ${this.calcDuration(waitTime)} `;
      }

      return result;
    },
  },
  methods: {
    test(t) {
      console.log("Button clicked", t);
    },

    formatDate(date) {
      return moment(date).format("DD MMM, dd").toLowerCase().replace(".", "");
    },
    formatTime(date) {
      return moment(date).format("kk:mm");
    },
    calcDuration(seconds) {
      let result = "";
      let days = 0;
      let hours = Math.floor(seconds / 3600);
      let minutes = (seconds - hours * 3600) / 60;

      if (hours > 23) {
        days = Math.floor(hours / 24);
      }

      if (days > 0) {
        result += `${days}д `;
      }
      if (hours > 0) {
        result += `${hours}ч `;
      }

      result += `${minutes}м`;

      return result;
    },

    luggageString(test) {
      // console.log("???", test);
      return test.alt_text;
    },
  },
};
</script>

<style lang="scss" scoped>
.flight-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;

  @media (max-width: 800px) {
    flex-direction: column;
  }

  .flight-card-route {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    padding: 1.5rem 2.5rem 1rem;

    @media (max-width: 1000px) {
      padding: 1rem 1.5rem 1rem;
    }
    @media (max-width: 800px) {
      padding: 1rem 1.5rem 1rem;
    }

    .temp {
      flex-direction: row;
      @media (max-width: 800px) {
        flex-direction: column;
      }
    }

    .flight-conditions {
      font-size: 0.75rem;
      @media (max-width: 1024px) {
        font-size: 0.625rem;
      }
      @media (max-width: 800px) {
        display: none;
      }
    }
  }

  .flight-card-info {
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    padding: 0.75rem 1.25rem 1rem;

    strong {
      font-size: 1.125rem;
      font-weight: 500;
    }

    .button-action {
      // font-size: 1.125rem;
      font-size: 1rem;
      font-weight: 700;
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
      padding-left: 3.5rem;
      padding-right: 3.5rem;

      @media (max-width: 1000px) {
        font-size: 1rem;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
        //     width: 100%;
        //     padding: 0.6rem 3.8rem;
        //     margin-left: auto;
        //     margin-right: auto;
      }
    }
  }

  .flight-route-stepper {
    // width: 80%;
    // flex: 1 1 0px;
    flex-grow: 1;
    // border: 1px solid red;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
}
</style>
