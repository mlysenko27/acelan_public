import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['selectedType', 'isotropicSection',
        'anisotropicSection', 'acousticLiquidSection']

    select_type(e) {
      const selected = this.selectedTypeTarget.value

        switch (selected){
            case 'Isotropic':
                this.isotropicSectionTarget.classList.remove('hidden')
                this.anisotropicSectionTarget.classList.add('hidden')
                this.acousticLiquidSectionTarget.classList.add('hidden')
                break;
            case 'Anisotropic':
                this.isotropicSectionTarget.classList.add('hidden')
                this.anisotropicSectionTarget.classList.remove('hidden')
                this.acousticLiquidSectionTarget.classList.add('hidden')
                break;
            case 'Acoustic Liquid':
                this.isotropicSectionTarget.classList.add('hidden')
                this.anisotropicSectionTarget.classList.add('hidden')
                this.acousticLiquidSectionTarget.classList.remove('hidden')
                break;
        }
    }
}
