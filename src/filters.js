import Vue from 'vue'
import _ from 'lodash'
import moment from 'moment'

Vue.filter('format_date', function (val) {
  if (_.isNull(val) || _.isUndefined(val)) return ''
  return moment(val).format('Y.MM.D')
})

Vue.filter('format_datetime', function (val) {
  if (_.isNull(val) || _.isUndefined(val)) return ''
  return moment(val).format('Y-MM-D')
})
