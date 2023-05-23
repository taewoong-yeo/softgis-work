import { Validator } from '../shared/validator';
import { Cookie } from '../shared/cookie-manage';

function SurveyGroupListRoute() {
	const $searchResultPaginate = $('.search-result-paginate');
	const $search = $('.sub-main');

	const searchDataSource = new kendo.data.DataSource({
		pageSize: 10,
		change: onSearchRender
	});

	$searchResultPaginate.kendoPager({
		dataSource: searchDataSource
	});

	function onSearchRender() {
		const metadatas = this.view();

		$searchResult.find('.search-result-item').remove();

		for(let i = 0; i < metadatas.length; i++) {
			const metadata = metadatas.at(i).toJSON();

			$searchResultEmpty.before($(HTML.ITEM(metadata)));
		}
	}

	$search.on('submit', '.search-field', onSearchSubmit);


	async function onSearchSubmit(e) {
		e.preventDefault();

		const $this = $(this);

		const data = $this.serializeFlat();

		history.pushState(null, '', _.currentLocation() + '?' + _.queryString(data));

		try {
			console.log(_.queryString(data));
			const result = await $.post(_.currentLocation(), data);
			$searchResultCount.find('strong').text(result.result.length);
			$searchResultPaginate.data('kendoPager').page(1);

			searchDataSource.data(result.result);
		} catch(e) {
			console.log(e);
		}
	}
}

export default SurveyGroupListRoute;