class DemoResult{
    constructor({data}) {
        this.data = data
    }
    render(){
        const textResult = document.createElement('label')
        textResult.classList.add('text-red-700')
        textResult.innerText = this.data?.message

        return textResult;
    }
    save(blockContent){
        return {
            message: this.data?.message
        }
    }
}
export {DemoResult}