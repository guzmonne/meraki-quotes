import Rx from 'rx'
import Firebase from 'firebase'

const makeCallback = (event, observer) => {
	if (event === 'value')
		return snap => observer.onNext(snap)
	else
		// Wrap into an object since we can onlu pass one argument through
		return (snapshot, prevName) => observer.onNext({snapshot, prevName})
}

const onObservable = (event, ref) =>{
	return Rx.Observable.create(observer => {
		const listener = ref.on(event, 
			makeCallback(event, observer), 
			error => observer.onError(error)
		)
		return () => ref.off(event, listener)
	}).
	publish().
	refCount()
}

export default onObservable