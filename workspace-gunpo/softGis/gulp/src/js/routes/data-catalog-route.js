import Loading from '../modules/loading';

const HTML = {
	TOGGLER: `
		<a href="#" class="search-filter-toggler"></a>
	`,
	ITEM: (metadata) => `
		<div class="search-result-item">
			<div class="data data-card">
				<!-- <a href="${Constant.CONTEXT_PATH}/dataCatalogDetail.do?mta_nm=${encodeURIComponent(metadata.mta_nm)}&${location.search.slice(1)}" class="data-overlay"> -->
				<a href="#none" class="data-overlay">
					<span class="u-ir">${metadata.mta_cat}</span>
					<div class="data-tag" data-category="${metadata.mta_cat}">${metadata.mta_cat_nm}</div>
					${metadata.mta_gther == 'DG_SHP' ? '<div class="data-type">SHP</div>' : ''}
					${metadata.mta_gther == 'DG_CSV' ? '<div class="data-type">CSV</div>' : ''}
					${metadata.mta_gther == 'DG_XLSX' ? '<div class="data-type">XLSX</div>' : ''}
					<h3 class="data-title">${metadata.mta_nm}</h3>
					<p class="data-desc">${metadata.mta_desc}</p>
					<div class="data-info">
						<div class="data-properties">
							<dl>
								<dt>수집주기</dt>
								<dd>${metadata.mta_fcly_nm}</dd>
							</dl>
							<dl>
								<dt>최근 갱신일</dt>
								<dd>${metadata.mta_tbl_last}</dd>
							</dl>
							<dl>
								<dt>데이터 수집 기관</dt>
								<dd>${metadata.mta_src}</dd>
							</dl>
						</div>
					</div>
				</a>
				<div class="data-download">
					<div class="data-type-xlsx" data-mta_tbl_last='${metadata.mta_tbl_last}' data-download_stat='${metadata.download_stat}'><i class="fas fa-file-excel"></i>엑셀 다운로드</div>
					<div class="data-type-csv" data-mta_tbl_last='${metadata.mta_tbl_last}' data-download_stat='${metadata.download_stat}'><i class="fas fa-file-csv"></i>CSV 다운로드</div>
					${metadata.mta_gther == 'DG_SHP' ? `<div class="data-type-shp" data-mta_tbl_last='${metadata.mta_tbl_last}' data-download_stat='${metadata.download_stat}'><i class="fas fa-layer-group"></i>SHP 다운로드</div>` : ``}
				</div>
			</div>
		</div>`
};

					
function DataCatalogRoute() {
	const $search = $('.search');
	const $serachField = $('.search-field');
	const $searchResult = $('.search-result-list');
	const $searchResultCount = $('.search-result-count');
	const $searchResultEmpty = $('.search-result-empty');
	const $searchResultPaginate = $('.search-result-paginate');

	const searchDataSource = new kendo.data.DataSource({
		pageSize: 10,
		change: onSearchRender
	});

	$searchResultPaginate.kendoPager({
		dataSource: searchDataSource
	});

	$search.on('submit', '.search-field', onSearchSubmit);
	$search.on('click', '.searchButton', onSearchSubmit);
	$search.on('click', '.search-filter-title', onFilterTitleClick);
	$search.on('change', '.search-filter input', onFilterChange);
	//$search.on('click', '.data-type-csv', onDownloadCsvClick);
	$search.on('click', '.data-type-shp', onDownloadShpClick);
	//$search.on('click', '.data-type-xlsx', onDownloadXlsxClick);

	$serachField.trigger('submit');

	async function onSearchSubmit(e) {
		e.preventDefault();

		const $this = $(this);
		const data = $this.serializeFlat();
		$search.find('.search-filter').each(function() {
			const $filter = $(this);
			const $filterInputs = $filter.find('input');

			const filter = $filter.serializeArray();

			if(filter.length == $filterInputs.length)
				return;
			const name = $filterInputs.eq(0).attr('name');
			if(filter[0].value != 'on'){
				data[name] = filter.map((v) => v.value).join(',');
			}
		});
		data['query'] = $("#search_keyword").val();

		history.pushState(null, '', _.currentLocation() + '?' + _.queryString(data));

		Loading.show();

		try {
			const result = await $.post(_.currentLocation(), data);

			$search.find('strong').text(result.metadatas.length);
			$searchResultPaginate.data('kendoPager').page(1);

			searchDataSource.data(result.metadatas);

			$searchResult.show();
		} finally {
			$searchResult.show();
			Loading.hide();
		}
	}

	function onSearchRender() {
		const metadatas = this.view();

		$searchResult.find('.search-result-item').remove();
		for(let i = 0; i < metadatas.length; i++) {
			const metadata = metadatas.at(i).toJSON();

			$searchResultEmpty.before($(HTML.ITEM(metadata)));
		}
	}

	function onFilterTogglerClick(e) {
		e.preventDefault();

		const $this = $(this);

		$this.prev('.search-filter-field').toggleClass('active');
	}

	function onFilterTitleClick(e) {
		e.preventDefault();

		const $this = $(this);

		$this.parent().toggleClass('inactive');
	}

	function onFilterChange(e) {
		const $this = $(e.currentTarget);
		const $categoryAll = $search.find('input#category_all');
		const $gatherAll = $search.find('input#gather_all');
		const $cycleAll = $search.find('input#cycle_all');
		const $sourceAll = $search.find('input#source_all');
		const $category = $search.find('input[name="category"]:not(#category_all)');
		const $gather = $search.find('input[name="gather"]:not(#gather_all)');
		const $cycle = $search.find('input[name="cycle"]:not(#cycle_all)');
		const $source = $search.find('input[name="source"]:not(#source_all)');

		if ($this.is($categoryAll)) {
			$category.prop('checked', false);
			$category.parents('label').removeClass('active');
			$categoryAll.parent('label').addClass('active');
		} else if($this.is($category)) {
			if($this.prop("checked")){
				$this.parent('label').addClass('active');
				$categoryAll.parent('label').removeClass('active');
				$categoryAll.prop('checked', false);
			} else {
				if($('input[name="category"]:not(#category_all):checked').length === 0){
					$categoryAll.prop('checked', true);
					$categoryAll.parent('label').addClass('active');
				}
				$this.parent('label').removeClass('active');
			}
			$this.prop("checked", $this.prop("checked"));
		}
		
		if ($this.is($gatherAll)) {
			$gather.prop('checked', false);
			$gather.parents('label').removeClass('active');
			$gatherAll.parent('label').addClass('active');
		} else if($this.is($gather)) {
			if($this.prop("checked")){
				$this.parent('label').addClass('active');
				$gatherAll.parent('label').removeClass('active');
				$gatherAll.prop('checked', false);
			} else {
				if($('input[name="gather"]:not(#gather_all):checked').length === 0){
					$gatherAll.prop('checked', true);
					$gatherAll.parent('label').addClass('active');
				}
				$this.parent('label').removeClass('active');
			}
			$this.prop("checked", $this.prop("checked"));
		}
		
		if ($this.is($cycleAll)) {
			$cycle.prop('checked', false);
			$cycle.parents('label').removeClass('active');
			$cycleAll.parent('label').addClass('active');
		} else if($this.is($cycle)) {
			if($this.prop("checked")){
				$this.parent('label').addClass('active');
				$cycleAll.parent('label').removeClass('active');
				$cycleAll.prop('checked', false);
			} else {
				if($('input[name="cycle"]:not(#cycle_all):checked').length === 0){
					$cycleAll.prop('checked', true);
					$cycleAll.parent('label').addClass('active');
				}
				$this.parent('label').removeClass('active');
			}
			$this.prop("checked", $this.prop("checked"));
		}
		
		if ($this.is($sourceAll)) {
			$source.prop('checked', false);
			$source.parents('label').removeClass('active');
			$sourceAll.parent('label').addClass('active');
		} else if($this.is($source)) {
			if($this.prop("checked")){
				$this.parent('label').addClass('active');
				$sourceAll.parent('label').removeClass('active');
				$sourceAll.prop('checked', false);
			} else {
				if($('input[name="source"]:not(#source_all):checked').length === 0){
					$sourceAll.prop('checked', true);
					$sourceAll.parent('label').addClass('active');
				}
				$this.parent('label').removeClass('active');
			}
			$this.prop("checked", $this.prop("checked"));
		}
		
		$serachField.trigger('submit');
	}
	
	function onDownloadCsvClick(e) {
		e.preventDefault();
		
		if ($('#usr_perm').val() != 'SMGR') {
			if ($(this).data('download_stat') == 'N') {
				alert('다운로드가 불가능한 데이터 입니다.\n데이터가 필요하신 경우 담당자에게 문의하시기 바랍니다.');
				return;
			}
		}
		
		const $this = $(this);
		const formData = { data_tbl: $this.data('mta_tbl_last') };
		const form = document.createElement('form');
		form.action = Constant.CONTEXT_PATH + '/getDataCatalogFullData.do';
		form.method = 'GET';
		//form.target = '_blank';

		for(const i in formData) {
			const field = document.createElement('input');
			field.type = 'hidden';
			field.name = i;
			field.value = formData[i];
			form.appendChild(field);
		}

		document.body.appendChild(form);
		form.submit();
	}
	
	function onDownloadShpClick(e) {
		e.preventDefault();

		if ($('#usr_perm').val() != 'SMGR') {
			if ($(this).data('download_stat') == 'N') {
				alert('다운로드가 불가능한 데이터 입니다.\n데이터가 필요하신 경우 담당자에게 문의하시기 바랍니다.');
				return;
			}
		}

		//Geoserver.downloadShapeFile($(this).data('mta_tbl_last'));
	}
	
	function onDownloadXlsxClick(e) {
		e.preventDefault();
		
		if ($('#usr_perm').val() != 'SMGR') {
			if ($(this).data('download_stat') == 'N') {
				alert('다운로드가 불가능한 데이터 입니다.\n데이터가 필요하신 경우 담당자에게 문의하시기 바랍니다.');
				return;
			}
		}
		
		if (!confirm('데이터 용량이 클 경우 시간이 오래 걸리는 작업입니다.\n계속 진행하시겠습니까?')) {
			return;
		}
		
		Loading.show();
		var excelUrl = Constant.CONTEXT_PATH + '/getDataCatalogExcelDownload.do';
		var request = new XMLHttpRequest();
		request.open('POST', excelUrl, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		request.responseType = 'blob';

		request.onload = function(e) {
			//$("#div_load_image").hide();

			var filename = "";
			var disposition = request.getResponseHeader('Content-Disposition');
			
			if (disposition && disposition.indexOf('attachment') !== -1) {
				var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
				var matches = filenameRegex.exec(disposition);
				if (matches != null && matches[1]) {
					filename = decodeURIComponent(matches[1] || '').replace(/\+/g, ' ');
                }
			}
			
			if (this.status === 200) {
				var blob = this.response;
				if (window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveBlob(blob, filename);
				} else {
					var downloadLink = window.document.createElement('a');
					var contentTypeHeader = request.getResponseHeader("Content-Type");
					downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
					downloadLink.download = filename;
					document.body.appendChild(downloadLink);
					downloadLink.click();
					document.body.removeChild(downloadLink);
				}
			}

			Loading.hide();
		};
		
		request.send('data_tbl=' + $(this).data('mta_tbl_last'));
	}
}

export default DataCatalogRoute;