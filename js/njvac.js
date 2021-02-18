////////////////////////////////////////
// reload page after Forward and back
///////////////////////////////////////


const TYPE_BACK_FORWARD = 2;

function isReloadedPage() {
  return performance.navigation.type === TYPE_BACK_FORWARD;
}


////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////




Vue.use(VueMeta);
new Vue({

  data() {
    return {
      counties: [],
      vaccine_sites: [],
      vaccine_sites_default:[]
    }
  },
  async fetch() {
    self = this;
    this.vaccine_sites_default = await this.$axios.get('https://newjersey.github.io/nj-vaccine-scraper/data.json')
    this.vaccine_sites = this.vaccine_sites_default.data;
    // build countylist

    this.vaccine_sites.map( function(a,b){
      if(a.official != undefined){
        console.log(a.official['County'])

        self.counties.push(a.official['County'])
      };

    })
    self.counties = [...new Set(self.counties)];
    self.counties.sort((a,b) => (b < a) ? 1 : ((a < b) ? -1 : 0));
  },

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString(process.env.lang) || ''
    },
    changeCounty($event)
    {
      self = this;
      console.log($event.target.value);
      const tempc =[];
      this.vaccine_sites_default.data.map( function(a,b){
        if(a.official ){
          if(a.official['County'] == $event.target.value)
          {
            tempc.push(a);
          }
        };
      })
      console.log(tempc);
      this.vaccine_sites = tempc;
    }
  }

  
});

