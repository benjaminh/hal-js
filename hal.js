$(document).ready(function() {
  var IDhal = ''; // À renseigner
  var valeurs2 = '&group=true&group.field=docType_s&group.limit=1000&fl=docid,citationFull_s&facet.field=fr_domainAllCodeLabel_fs&facet.field=keyword_s&facet.field=journalIdTitle_fs&facet.field=producedDateY_i&facet.field=authIdLastNameFirstName_fs&facet.field=instStructIdName_fs&facet.field=labStructIdName_fs&facet.field=deptStructIdName_fs&facet.field=rteamStructIdName_fs&facet.mincount=1&facet=true&sort=producedDateY_i desc&wt=json&json.nl=arrarr'
  var url = 'http://api.archives-ouvertes.fr/search/?q=authId_i:' + IDhal + '&fl=' + valeurs2;

  //Récupération des types de publications
  var urltype = 'http://api.archives-ouvertes.fr/ref/doctype?wt=json&lang=en';
  var content = '';

  // Requête AJAX
  $.getJSON(url, function (data) {
    result = data;
    $.getJSON(urltype, function (typespublis) {
      typesresult = typespublis["response"];
      // Ajout des publications
      for (i = 0; i < result['grouped']['docType_s']['groups'].length ; i++) {
          for (d = 0; d < typesresult['result']['doc'].length; d++) {
            if (result['grouped']['docType_s']['groups'][i]['groupValue'] == typesresult['result']['doc'][d]['str'][0]) {
              titre = typesresult['result']['doc'][d]['str'][1];
            }
          }
          content += '<li><div class="grp-div"><h4>' + titre + '<span class="nbmetadata" style="margin-left:10px;">' + result['grouped']['docType_s']['groups'][i]['doclist']['numFound'] + ' ' + 'documents' + '</span></h4>';
          content += '<div class="grp-content">';
          content += '<ul>';
          for (var j = 0; j < result['grouped']['docType_s']['groups'][i]['doclist']['docs'].length; j++) {
              content += '<li>' + result['grouped']['docType_s']['groups'][i]['doclist']['docs'][j]['citationFull_s'] + '</li>';
          }
          content += '</ul></div>';
          content += '</div></li>';
      }

      $('#liste-publis').append(content);
  });
  });
});
