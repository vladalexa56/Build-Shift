export const generateRow = function (
  date,
  sTime,
  eTime,
  hWage,
  workplace,
  shiftSlug,
  comments,
  totalProfit
) {
  const html = ` <tr>
      <td>${date}</td>
      <td>${sTime}</td>
      <td>${eTime}</td>
      <td>${hWage}</td>
      <td>${workplace}</td>
      <td>${shiftSlug}</td>
      
      <td>${totalProfit}</td>
      <td><button type="button" class="btn btn-warning edit">Edit</button> <button type="button" class="btn btn-danger remove">Remove</button></td>
     </tr>`;

  tbody.insertAdjacentHTML("beforeend", html);
};

export const modifyShift = function (shifts, wagePerDay) {
  shifts.startTime = startTime.value;
  shifts.endTime = endTime.value;
  shifts.hourlyWage = hourlyWage.value;
  shifts.workplace = workplace.value;
  shifts.shiftSlug = shiftSlug.value;
  shifts.comments = comments.value;
  shifts.totalProfit = wagePerDay;
};
