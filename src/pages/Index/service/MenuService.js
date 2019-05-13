import resource from 'src/common/resource'
import { locationPath } from 'src/common/api'

export default (function () {
    let service = resource(locationPath('/mock/menu.json'), {}, {})

    return service
})()