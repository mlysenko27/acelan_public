import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['details']
    click(e) {
        const detailsId = e.currentTarget.dataset.materialsDetailsId

        const details = this.detailsTargets
        for (const row of details){
            if (row.dataset.detailsId === detailsId){
                row.classList.toggle('hidden')
            } else {
                row.classList.add('hidden')
            }
        }
    }
}
