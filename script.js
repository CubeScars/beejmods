const form = document.getElementById('upload-form');

form.addEventListener('submit', event => {
  event.preventDefault();

  // disable the form to prevent multiple submissions
  form.querySelector('button').disabled = true;

  // show a loading indicator
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  form.appendChild(spinner);

  // extract the image file from the form
  const formData = new FormData(form);
  const imageFile = formData.get('image-input');

  // open the locally stored .zip file
  JSZip.loadAsync('files\file1.19classic.zip').then(zip => {
    // replace the existing image with the new one
    zip.file('\assets\minecraft\textures\item\totem_of_undying.png', imageFile);

    // generate a new .zip file
    zip.generateAsync({type: 'blob'}).then(content => {
      // create a link to the new .zip file
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'modified.zip';

      // add the link to the document and click it to trigger the download
      document.body.appendChild(link);
      link.click();

      // remove the link from the document
      document.body.removeChild(link);

      // enable the form and remove the loading indicator
      form.querySelector('button').disabled = false;
      form.removeChild(spinner);
    });
  });
});
