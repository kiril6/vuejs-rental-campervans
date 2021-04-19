<template>
  <div class="details">
    <div class="details__back">
      <Button name="Go Back" @click.native="back">
        <chevron-left-icon />
      </Button>
    </div>
    <div class="details__results">
      <h1 v-text="txt.title" />
      <div v-if="loading || isOffline" class="info">
        <div :class="loading ? 'loading' : 'hidden'">
          <img src="@/assets/images/loader.gif" />
        </div>
        <div :class="isOffline ? 'offline' : 'hidden'">
          <wifi-off-icon size="70" />
        </div>
      </div>
      <div
        v-if="!loading && bookingDetails.length === 0"
        class="md:w-48 w-full"
      >
        <Button name="Try again" @click.native="getData(this.detailsData[0])">
          <refresh-icon />
        </Button>
      </div>
      <span class="details__results__filter-title"><i>Station:</i> {{ stationName }} | <i>Date Range:</i> {{ startDate }} / {{ endDate}} </span>
      <ul class="details__results__list">
        <li v-for="(station, index) of bookingDetails" :key="index">
            <template v-if="station.bookings[filterStationName()].startDate.slice(0, 10) >= startDate && station.bookings[filterStationName()].endDate.slice(0, 10) <= endDate">
               <tent-icon />
                <div><i>{{ txt.customerName }}</i> {{ station.bookings[filterStationName()].customerName }}</div>
                <div><i>{{ txt.startDate }}</i>  {{ station.bookings[filterStationName()].startDate.slice(0, 10) }} </div>
                <div><i>{{ txt.endDate }} </i>{{ station.bookings[filterStationName()].endDate.slice(0, 10) }} </div>
            </template>
            <template v-else-if="index===0" >{{ txt.noResults }} </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: "Details",
  components: {
    Button,
  },

  data() {
    return {
      txt: {
        title: 'Booking Details',
        customerName: 'Customer Name: ',
        startDate: 'Start Date: ',
        endDate: 'End Date: ',
        noResults: 'No results for the searched criteria, go back and search again.',
      },
      loading: true,
      isOffline: false,
      fetchingError: false,
      stationName: this.detailsData[0],
      startDate: this.detailsData[1],
      endDate: this.detailsData[2],
      bookingDetails: [],
    };
  },
  mounted() {
    // start api call on component mounting
    this.getData();
  },
  props: {
    // passing search criteria as props
    detailsData: Array,
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    filterStationName() {
      return this.stationName.slice(-1) - 1;
    },
    checkConnection() {
      if (navigator.onLine) {
        this.isOffline = false;
      } else {
        this.isOffline = true;
        setTimeout(() => (this.isOffline = false), 3000);
      }
    },
    getData() {
      const API_URL = "https://605c94c36d85de00170da8b4.mockapi.io/stations/";
      var app = this;
      this.checkConnection();

      if (!this.isOffline && this.bookingDetails.length === 0 && !app.error) {
        app.axios
          .get(API_URL)
          .then(function (res) {
            if (!res.data || res.data.length == 0) {
              const emptyDataError = new Error("Invalid data");
              emptyDataError.statusCode = 500;
              throw emptyDataError;
            }
            app.bookingDetails = res.data && res.data.length ? res.data : [];
          })
          .catch(function (e) {
            app.error = e ? true : false;
            console.log("Error getting data " + e);
          })
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/colors.scss";
.details {
  @apply flex flex-col items-center;

  &__back {
    @apply w-3/4 pb-4;
    .button {
      @apply w-36 px-1 py-2;
    }
  }

  &__results {
    @apply flex flex-col items-center w-3/4;
    h1 {
      color: $text;
      border-bottom: 1px solid $border;
      @apply md:text-3xl lg:text-4xl w-full px-4 pb-4 mb-5 text-2xl font-semibold text-center;
    }
    &__filter-title {
      @apply font-semibold text-base md:text-lg mb-8;
      i {
        @apply font-bold;
      }
    }
    &__list {
      @apply w-10/12 md:w-6/12 mb-40;
      li {
        @apply pb-3;
        > div i {
          @apply font-semibold;
        }
        &:empty {
          @apply hidden;
        }
      }
    }
  }

  .info {
    @apply mb-14 flex justify-center w-full h-full pointer-events-none;
    div {
      background: $frame;
      border: 4px solid $border;
      @apply rounded-3xl md:h-48 w-52 md:w-72 relative flex items-center justify-center h-48 shadow-2xl;
      > .icon {
        @apply text-6xl;
      }
      img {
        @apply pb-6;
      }
      &.hidden {
        display: none;
      }
      &.loading:after {
        content: "Loading..";
        @apply animate-pulse bottom-1 absolute block font-semibold text-center;
      }
      &.offline:after {
        content: "No internet connectivity!";
        @apply animate-pulse bottom-3 absolute block font-semibold text-center;
      }
    }
  }
}
</style>
