<template>
  <div class="home">
    <div class="home__title">
      <h1 v-text="txt.title" />
    </div>
    <div class="home__booking">
      <div
        class="home__booking__search"
        :class="
          searchResults.length && !suggestionChosen
            ? 'home__booking__search--align-start'
            : ''
        "
      >
        <input
          type="text"
          autofocus
          :placeholder="txt.searchPlaceholder"
          v-model="station"
          @input="getSuggestionList(false)"
        />

        <ul
          v-show="!this.isOffline && searchResults.length && !suggestionChosen"
          class="home__booking__search__suggestions"
        >
          <li v-for="(station, index) in searchResults" :key="index">
            <div @click="chooseSuggestion(station.name)">
              <caravan-icon /><span>{{ station.name }}</span>
            </div>
          </li>
        </ul>

        <ul
          v-show="
            !this.isOffline && !searchResults.length && station.length > 0
          "
          class="home__booking__search__suggestions empty"
        >
          <li v-text="txt.noResults" />
        </ul>
        <ul
          v-show="this.isOffline && !this.searched"
          class="home__booking__search__suggestions offline"
        >
          <li>
            {{ txt.offline }} <span class="ml-2"><wifi-off-icon /></span>
          </li>
        </ul>
      </div>
      <div class="home__booking__date">
        <DatePicker
          ref="calendar"
          :columns="$screens({ default: 1, xl: 2 })"
          v-model="range"
          is-range
          color="gray"
          mode="date"
          :model-config="datePickerConfig"
          :class="!suggestionChosen ? 'disabled' : ''"
        />
      </div>
      <div class="home__booking__button">
        <Button
          name="Search"
          :isDisabled="
            suggestionChosen && range.start && range.end ? false : true
          "
          @click.native="search(true)"
        >
          <search-icon />
        </Button>
        <div
          v-show="this.isOffline && this.searched"
          class="home__booking__button offline"
        >
          <div>
            {{ txt.offline }} <span class="ml-2"><wifi-off-icon /></span>
          </div>
        </div>
      </div>
    </div>
    <div class="home__backgrounds">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from "@/components/Button.vue";
import { DatePicker } from "v-calendar";

export default {
  name: "Home",
  components: {
    DatePicker,
    Button,
  },
  data() {
    return {
      txt: {
        title: "Check booked campervans at stations.",
        searchPlaceholder: "Search for stations",
        noResults: "No Statons Found",
        offline: "No internet connectivity!",
      },
      station: "",
      suggestionChosen: false,
      searchResults: [],
      error: false,
      isOffline: false,
      searched: Boolean,
      range: {
        start: "",
        end: "",
      },
      datePickerConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
    };
  },

  mounted() {
    // get vuex store (if stored) on mounted
    this.getStore();
  },

  watch: {
    station(newValue, oldValue) {
      if (newValue.length <= 0 && oldValue.length) {
        this.suggestionChosen = false;
      }

      if (newValue.length === 0) {
        this.error = false;
        this.searchResults = [];
        this.range = [];
      }
    },
  },

  methods: {
    chooseSuggestion(value) {
      this.station = value;
      this.suggestionChosen = true;
    },
    getStore() {
      const calendar = this.$refs.calendar;

      this.station = this.$store.getters.getStation;
      this.range = this.$store.getters.getRange;

      if(this.station && this.range) {
        calendar.move(this.range.start);
        this.getSuggestionList(this.station);
        this.suggestionChosen = true;
      }
    },
    updateStore() {
      this.$store.dispatch("updateStore", {
        stationName: this.station,
        dateRange: this.range,
      });
    },
    search(value) {
      this.checkConnection();
      this.searched = value;

      if (!this.isOffline) {
        this.updateStore();
        // if get data then go to the next page and stop loading to false
        this.$router.push({
          name: "Details",
          params: {
            station: this.station,
            dateStart: this.range.start,
            dateEnd: this.range.end,
          },
        });
      }
    },
    getSuggestionList(value) {
      const API_URL = "https://605c94c36d85de00170da8b4.mockapi.io/stations/";
      var app = this;

      this.searched = value;

      this.checkConnection();

      if (!this.isOffline && this.searchResults.length === 0 && !app.error) {
        app.axios
          .get(API_URL, {
            params: {
              name: this.station,
            },
          })
          .then(function (res) {
            if (!res.data || res.data.length == 0) {
              const emptyDataError = new Error("Invalid data");
              emptyDataError.statusCode = 500;
              throw emptyDataError;
            }
            app.searchResults = res.data && res.data.length ? res.data : [];
          })
          .catch(function (e) {
            app.error = e ? true : false;
            console.log("Error getting data " + e);
          });
      }
    },
    checkConnection() {
      if (navigator.onLine) {
        this.isOffline = false;
      } else {
        this.isOffline = true;
        setTimeout(() => (this.isOffline = false), 3000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/colors.scss";

.home {
  @apply mb-20;

  &__title {
    @apply flex justify-center;
    h1 {
      color: $text;
      @apply md:mb-16 lg:mb-20 lg:pl-0 md:pr-0 md:text-3xl lg:text-4xl px-4 mb-10 text-2xl font-semibold;
    }
  }

  &__booking {
    background: $frame;
    @apply md:flex-row flex flex-col items-center justify-around w-full pt-4 pb-4;

    &__search {
      input {
        border: 1px solid $border;
        @apply w-full px-3 py-2 font-semibold rounded-md;
      }
      @apply md:mb-0 sm:w-5/12 md:w-72 md:mx-4 relative w-11/12 mb-6;

      &:hover {
        @apply filter drop-shadow-lg;
      }

      &__suggestions {
        background: $white;
        border: 1px solid $border;
        @apply md:absolute overscroll-contain z-10 w-full h-56 px-2 overflow-hidden overflow-y-auto;

        li {
          & > div {
            @apply flex items-center pt-4 pb-4;

            &:hover {
              background-color: rgba($background, 0.3);
              @apply font-semibold rounded-lg cursor-pointer;
            }

            > span {
              @apply ml-3;
            }
          }
          &:last-child {
            @apply mb-12;
          }
        }

        &.empty,
        &.offline {
          @apply h-10 overflow-y-hidden;
          li {
            @apply flex py-2;
          }
        }
      }

      &--align-start {
        @apply md:self-start;
      }
    }
    &__date {
      border: 1px solid $border;
      @apply rounded-lg;
      .disabled {
        @apply opacity-75 pointer-events-none;
      }
      &:hover {
        @apply filter drop-shadow-lg;
      }
    }

    &__button {
      @apply w-72 relative flex justify-center;
      &.offline {
        @apply top-14 absolute;
        > div {
          color: $white;
          @apply flex font-semibold;
        }
      }
      .button {
        @apply md:w-32;
      }
    }
  }

  &__backgrounds {
    background: $white;
    div {
      background-image: url("../assets/images/camping.png");

      @apply h-44 sm:h-56 md:h-64 lg:h-72 relative w-3/6 transition duration-300 bg-center bg-no-repeat bg-contain;

      &:first-of-type {
        background-image: url("../assets/images/vehicle.png");
        transform: scaleX(-1);
        &:hover {
          transform: scaleX(-1);
          &:before {
            content: "rent vehicle";
            transform: scaleX(-1);
          }
        }
      }
      &:hover {
        &:before {
          content: "find camping spot";
          @apply top-2 absolute left-0 block w-full text-center;
        }
        @apply filter contrast-125 font-semibold transition duration-300 transform scale-95;
      }
    }
    @apply flex justify-center justify-between;
  }
}
</style>
